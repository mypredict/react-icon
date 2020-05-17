import { useRef, useCallback, useEffect } from 'react';

export type TimeoutFn<T extends any[]> = (...args: T) => any;

export interface RV<T extends any[]> {
  run: (...args: T) => void;
  runNow: (...args: T) => void;
  clear: () => void;
}

function useTimeout<T extends any[]>(fn: TimeoutFn<T>, delay: number = 0): RV<T> {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clear = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }, []);

  const fnRef = useRef<TimeoutFn<T>>(fn);
  fnRef.current = fn;

  const runNow = useCallback((...args: T) => {
    fnRef.current(...args);
  }, []);

  const run = useCallback(
    (...args: T) => {
      timer.current = setTimeout(() => {
        fnRef.current(...args);
        clear();
      }, delay);
    },
    [clear, delay]
  );

  useEffect(() => clear, [clear]);

  return { run, runNow, clear };
}

export default useTimeout;
