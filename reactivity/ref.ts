import { track, trigger } from './effect'

export function ref(value: any) {
  const ref = {
    get value() {
      track(ref)
      return value
    },
    set value(newVal) {
      value = newVal
      trigger(ref)
    }
  }
  return ref
}
