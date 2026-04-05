import { useState, useEffect } from 'react';
import { getStorage, setStorage } from '@/utils';

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = getStorage<T>(key);
      return item !== null ? item : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      setStorage(key, valueToStore);
    } catch (error) {
      console.error('LocalStorage set error:', error);
    }
  };

  const removeValue = () => {
    try {
      setStoredValue(initialValue);
      localStorage.removeItem(key);
    } catch (error) {
      console.error('LocalStorage remove error:', error);
    }
  };

  return [storedValue, setValue, removeValue];
}
