import { useState, useEffect } from 'react';

function useDebounceState<T>(
  initialValue: T,
  delay: number,
): [T, T, (value: T) => void] {
  const [currentValue, setCurrentValue] = useState<T>(initialValue);
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(currentValue);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [currentValue, delay]);

  return [currentValue, debouncedValue, setCurrentValue];
}

export default useDebounceState;
