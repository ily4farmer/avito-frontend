import { useCallback, useEffect, useRef } from 'react';

export const useDebounceCallback = <A extends unknown[], R>(
  callback: (...args: A) => R,
  delay: number,
) => {
  const timeout = useRef<ReturnType<typeof setTimeout>>(null);

  const cleanup = useCallback(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
  }, []);

  useEffect(() => cleanup, [cleanup]);

  return useCallback(
    (...args: A) => {
      cleanup();

      timeout.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, cleanup, delay],
  );
};
