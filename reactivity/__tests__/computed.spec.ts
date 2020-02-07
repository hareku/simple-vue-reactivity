import { computed } from '../computed'
import { ref } from '../ref'

describe('reactivity/computed', () => {
  it('should observe ref', () => {
    const counter = ref(0)
    const double = computed(() => counter.value * 2)

    expect(double.value).toBe(0)
    counter.value = 5
    expect(double.value).toBe(10)
  })

  it('should observe multiple refs', () => {
    const counter1 = ref(0)
    const counter2 = ref(0)
    const multiplied = computed(() => counter1.value * counter2.value)

    expect(multiplied.value).toBe(0)
    counter1.value = 2
    counter2.value = 5
    expect(multiplied.value).toBe(10)
  })

  it('should observe computed', () => {
    const counter = ref(0)
    const twoTimes = computed(() => counter.value * 2)
    const fourTimes = computed(() => twoTimes.value * 2)

    expect(fourTimes.value).toBe(0)
    counter.value = 2
    expect(fourTimes.value).toBe(8)
  })
})
