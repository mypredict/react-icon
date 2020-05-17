import { useState, useEffect, useCallback } from 'react';
import useDebounce from '../useDebounce/useDebounce';
import binarySearch from '../../utils/binarySearch';

export type ItemHeight = number | ((index: number) => number);

export interface Options {
  itemHeight: ItemHeight;
  renderCount?: number;
  delay?: number;
}

export interface RV<T> {
  isScrolling: boolean;
  startIndex: number;
  endIndex: number;
  list: Array<T>;
  containerProps: {
    onScroll: (e: any) => void;
    style: { overflowY: 'auto' };
  };
  wrapperProps: {
    style: {
      boxSizing: 'border-box';
      width: '100%';
      height: number;
      paddingTop: number;
    };
  };
}

function useVirtualized<T = any>(items: Array<T>, options: Options): RV<T> {
  const { itemHeight, renderCount = 10, delay = 100 } = options;

  // 缓存每个项目对应的 paddingTop 值, 多出最后一个值即为总高度
  const [paddingTopCache, setPaddingTopCache] = useState<Array<number>>([]);
  useEffect(() => {
    let paddingTopCache = [];
    if (typeof itemHeight === 'number') {
      paddingTopCache = items.reduce(
        (result, _, index) => {
          result.push((index + 1) * itemHeight);
          return result;
        },
        [0]
      );
    } else {
      paddingTopCache = items.reduce(
        (result, _, index) => {
          result.push(result[index] + itemHeight(index));
          return result;
        },
        [0]
      );
    }
    setPaddingTopCache(paddingTopCache);
  }, [items, itemHeight]);

  // 检测是否处于滚动状态
  const [isScrolling, setIsScrolling] = useState(false);
  const { run } = useDebounce(() => setIsScrolling(false), delay);

  // 滚动时更新 startIndex
  const [startIndex, setStartIndex] = useState(0);
  const handleScroll = useCallback(
    (e: any) => {
      e.preventDefault();
      run();
      if (Math.abs(e.target.scrollTop - paddingTopCache[startIndex]) > 0) {
        let newStartIndex = 0;
        if (typeof itemHeight === 'number') {
          newStartIndex = Math.floor(e.target.scrollTop / itemHeight);
        } else {
          // 二分查找对应 startIndex
          const searchResult = binarySearch(paddingTopCache, e.target.scrollTop);
          if (Array.isArray(searchResult)) {
            newStartIndex = Math.min(...searchResult);
          } else {
            newStartIndex = searchResult;
          }
        }
        setStartIndex(newStartIndex);
        setIsScrolling(true);
      }
    },
    [itemHeight, paddingTopCache, run, startIndex]
  );

  return {
    isScrolling,
    startIndex,
    endIndex: startIndex + renderCount,
    list: items.slice(startIndex, startIndex + renderCount),
    containerProps: {
      onScroll: handleScroll,
      style: { overflowY: 'auto' },
    },
    wrapperProps: {
      style: {
        boxSizing: 'border-box',
        width: '100%',
        height: paddingTopCache[items.length],
        paddingTop: paddingTopCache[startIndex],
      },
    },
  };
}

export default useVirtualized;
