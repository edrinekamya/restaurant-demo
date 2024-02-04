import { MEDIUM_BREAKPOINT, SMALL_BREAKPOINT } from '@/constants'
import { useWindowSize } from '@vueuse/core'
import { computed } from 'vue'

export function useResponsiveness() {
  const { width } = useWindowSize()

  const isMedium = computed(() => width.value <= MEDIUM_BREAKPOINT)
  const isSmall = computed(() => width.value <= SMALL_BREAKPOINT)

  return {
    isMedium,
    isSmall
  }
}
