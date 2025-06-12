import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function plus() {
    count.value++
  }

  function minus() {
    count.value--
  }
  return { count, doubleCount, plus, minus }
})
