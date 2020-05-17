import { useRef, useCallback, useEffect } from 'react';

export type IntervalFn<T extends any[]> = (...args: T) => any;

export interface RV<T extends any[]> {
  run: (...args: T) => void;
  runNow: (...args: T) => void;
  clear: () => void;
}

function useInterval<T extends any[]>(fn: IntervalFn<T>, delay: number = 0): RV<T> {
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const clear = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }, []);

  const fnRef = useRef<IntervalFn<T>>(fn);
  fnRef.current = fn;

  const runNow = useCallback((...args: T) => {
    fnRef.current(...args);
  }, []);

  const run = useCallback(
    (...args: T) => {
      clear();
      timer.current = setInterval(() => {
        fnRef.current(...args);
      }, delay);
    },
    [clear, delay]
  );

  useEffect(() => clear, [clear]);

  return { run, runNow, clear };
}

export default useInterval;
