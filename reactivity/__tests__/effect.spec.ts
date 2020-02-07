import { effect } from '../effect'
import { ref } from '../ref'

describe('reactivity/effect', () => {
  it('should observe ref', () => {
    let dummy

    const counter = ref(0)
    effect(() => (dummy = counter.value))

    expect(dummy).toBe(0)
    counter.value = 7
    expect(dummy).toBe(7)
  })

  it('should observe multiple refs', () => {
    let dummy
    const counter1 = ref(0)
    const counter2 = ref(0)
    effect(() => (dummy = counter1.value * counter2.value))

    counter1.value = 1
    expect(dummy).toBe(0)

    counter1.value = 5
    counter2.value = 2
    expect(dummy).toBe(10)
  })
})
