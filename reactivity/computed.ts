import { effect } from './effect'
export function computed<T = any>(getter: () => T): { value: T } {
  let value: T

  effect(() => {
    value = getter()
  })

  return {
    get value() {
      return value
    }
  }
}
