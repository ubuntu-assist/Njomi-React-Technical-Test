import { useCallback, useState } from 'react'
import { SetValue, ValueType } from '../types'

/**
 * @author FOPA KUETE DUCLAIR
 * A hook for managing local storage data.
 * @param key the key to use for storing data in local storage
 * @param initialValue the initial value to use if no data is found in local storage
 * @returns an array containing the current value and a function for updating the value
 */
export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, SetValue<T>] {
  const readValue = useCallback(() => {
    try {
      const value = localStorage.getItem(key)
      return value ? (parseJSON(value) as T) : initialValue
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error)
      return initialValue
    }
  }, [key, initialValue])
  const [storedValue, setStoredValue] = useState<T>(readValue)
  const setValue: SetValue<T> = (value: ValueType<T>) => {
    try {
      const newValue = value instanceof Function ? value(storedValue) : value
      localStorage.setItem(key, JSON.stringify(newValue))
      setStoredValue(newValue)
    } catch (error) {
      console.log(error)
    }
  }
  return [storedValue, setValue]
}

/**
 * Parses a JSON string and returns a JavaScript value.
 * @param value the JSON string to parse
 */
function parseJSON(value: string | null) {
  try {
    return value === 'undefined' ? undefined : JSON.parse(value ?? '')
  } catch (error) {
    console.log(error)
    return undefined
  }
}
