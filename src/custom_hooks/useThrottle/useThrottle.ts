import { useState, useRef, useCallback, useEffect } from 'react';

export type ThrottleFn<T extends any[]> = (...args: T) => any;

export interface RV<T extends any[]> {
  run: (...args: T) => void;
  runNow: (...args: T) => void;
  clear: () => void;
}

function useThrottle<T extends any[]>(fn: ThrottleFn<T>, delay: number = 0): RV<T> {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clear = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }, []);

  const fnRef = useRef<ThrottleFn<T>>(fn);
  fnRef.current = fn;

  const runNow = useCallback((...args: T) => {
    fnRef.current(...args);
  }, []);

  const [pendding, setPendding] = useState(false);
  const run = useCallback(
    (...args: T) => {
      if (!pendding) {
        setPendding(true);
        clear();
        timer.current = setTimeout(() => {
          setPendding(false);
          fnRef.current(...args);
        }, delay);
      }
    },
    [clear, pendding, delay]
  );

  useEffect(() => clear, [clear]);

  return { run, runNow, clear };
}

export default useThrottle;
