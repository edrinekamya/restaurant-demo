<script setup lang="ts">
import { useResponsiveness } from '@/composables/responsive'
import { ref, watch } from 'vue'

const spin = ref(false)
const { isMedium: isSmallScreen } = useResponsiveness()

const props = defineProps<{
  size: number
  quantity: number
}>()

defineEmits(['press'])

watch(
  () => props.quantity,
  (n) => {
    if (n > 1) {
      spin.value = true
      setTimeout(() => {
        spin.value = false
      }, 2000)
    }
  }
)
</script>

<template>
  <Transition name="spin">
    <button
      :style="{
        width: size + 'px',
        height: size + 'px'
      }"
      :class="{ spin }"
      v-show="isSmallScreen && quantity"
      @click.stop="$emit('press')"
      class="center circle"
    >
      <span class="center counter">{{ quantity }}</span>
      <slot></slot>
    </button>
  </Transition>
</template>

<style scoped>
@keyframes spin {
  20% {
    transform: scale(1);
  }

  40% {
    transform: scaleX(-1);
  }

  100% {
    transform: scaleX(1);
  }
}

@keyframes slideOut {
  to {
    transform: scale(0);
  }
}

.spin {
  animation: spin 1s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

.spin-enter-from {
  transform: scale(0, 0);
}

.spin-enter-to {
  animation: spin 2s ease-in-out;
}

.spin-leave-to {
  animation: slideOut 0.5s ease-in-out;
}

.counter {
  font-weight: bold;
  z-index: 1;
  color: white;
  position: absolute;
  font-size: 14px;
  right: 0;
  top: 0;
  height: 24px;
  width: 24px;
  text-align: center;
  background: var(--color-background-2);
  border-radius: var(--border-radius-r);
}

.circle {
  position: relative;
  backdrop-filter: blur(10px);
}

.icon {
  color: var(--color-background-2);
}
</style>
