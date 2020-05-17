import { useRef, useCallback, useEffect } from 'react';

export type DebounceFn<T extends any[]> = (...args: T) => any;

export interface RV<T extends any[]> {
  run: (...args: T) => void;
  runNow: (...args: T) => void;
  clear: () => void;
}

function useDebounce<T extends any[]>(fn: DebounceFn<T>, delay: number = 300): RV<T> {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clear = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }, []);

  const fnRef = useRef<DebounceFn<T>>(fn);
  fnRef.current = fn;

  const runNow = useCallback((...args: T) => {
    fnRef.current(...args);
  }, []);

  const run = useCallback(
    (...args: T) => {
      clear();
      timer.current = setTimeout(() => {
        fnRef.current(...args);
        clear();
      }, delay);
    },
    [delay, clear]
  );

  useEffect(() => clear, [clear]);

  return { run, runNow, clear };
}

export default useDebounce;
