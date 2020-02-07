import { ref, effect, computed } from '../reactivity'

const countElement = document.getElementById('count')
const multipliedElement = document.getElementById('multiplied')
const incrementButton = document.getElementById('increment')
const decrementButton = document.getElementById('decrement')

if(countElement && multipliedElement && incrementButton && decrementButton) {
  const count = ref(0)
  const multiplied = computed(() => count.value * 2)

  incrementButton.addEventListener('click', () => {
    count.value++
  })
  decrementButton.addEventListener('click', () => {
    count.value--
  })

  effect(() => {
    countElement.innerText = String(count.value)
    multipliedElement.innerText = String(multiplied.value)
  })
}
