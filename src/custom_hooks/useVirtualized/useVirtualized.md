# 长列表优化

## demo1

```js
import React from 'react';
import { useVirtualized } from './custom_hooks/index';

const items = Array.from(Array(100000)).map((_, index) => {
  return {
    id: index,
    other: `${index} list`
  };
});

function Demo1() {
  const { list, containerProps, wrapperProps } = useVirtualized(items, {
    itemHeight: 50
  });

  return (
    <div
      {...containerProps}
      style={{
        width: '300px',
        height: '400px',
        margin: '0 auto',
        overflow: 'auto',
        background: '#eee'
      }}
    >
      <div {...wrapperProps}>
        {list.map(item => (
          <div style={{ height: 50 }} key={item.id}>
            编号: {item.id}
          </div>
        ))}
      </div>
    </div>
  );
}
```

## demo2

```js
import React from 'react';
import { useVirtualized } from './custom_hooks/index';

const items = Array.from(Array(100000)).map((_, index) => {
  return {
    id: index,
    other: `${index} list`
  };
});

const computeIndexHeight = (index: number) => {
  return index % 3 === 0
    ? 25
    : index % 2 === 0
      ? 50
      : 70;
};

function Demo1() {
  const { list, containerProps, wrapperProps, isScrolling } = useVirtualized(items, {
    itemHeight: computeIndexHeight
  });

  return (
    <div
      {...containerProps}
      style={{
        width: '300px',
        height: '400px',
        margin: '0 auto',
        overflow: 'auto',
        background: '#eee'
      }}
    >
      <div {...wrapperProps}>
        {isScrolling
            ? list.map(item => (
                <div style={{ height: computeIndexHeight(item.id), boxSizing: 'border-box' }} key={item.id}>
                  滚动时展示的内容(用于限制个数后每一项渲染仍耗费大量资源的情况): {item.id}
                </div>
              ))
            : list.map(item => (
                <div style={{ height: computeIndexHeight(item.id), boxSizing: 'border-box' }} key={item.id}>
                  实际内容: {item.id}
                </div>
              ))
        }
      </div>
    </div>
  );
}
```

## params

```ts
items: Array<any>; // 需要渲染的长列表
options: {
  itemHeight: number | ((index: number) => number), // 每项高度, 固定值或计算函数
  renderCount?: number, // 渲染个数
  delay?: number // 优化滚动过程中显示内容的延迟时间
};
```

## result

```ts
isScrolling: boolean; // 是否处于滚动状态
startIndex: number; // 开始渲染的下标
endIndex: number; // 结束渲染的下标
list: Array<T>; // 渲染的项目集合
containerProps: object; // 最外层 div 的属性
wrapperProps: object; // 第二层 div 的属性
```
