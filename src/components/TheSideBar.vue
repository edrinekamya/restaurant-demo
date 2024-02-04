<script setup lang="ts">
import { useResponsiveness } from '@/composables/responsive'

const { isMedium } = useResponsiveness()

defineProps<{ isShown: boolean; size: number }>()
defineEmits(['close'])
</script>

<template>
  <Transition :name="isMedium ? 'slide' : undefined">
    <aside
      v-if="size && (!isMedium || isShown)"
      @click.stop="null"
      :class="{
        shadow: isMedium,
        absolute: isMedium
      }"
    >
      <section class="flex column content">
        <slot></slot>
      </section>
    </aside>
  </Transition>
</template>

<style scoped>
.slide-enter-from,
.slide-leave-to {
  transform: translateX(1500px);
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}

aside {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  background: var(--bg-white);
  z-index: 10;
  width: 300px;
}

@media (max-width: 1024px) {
  aside {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
  }
}

@media (max-width: 600px) {
  aside {
    position: absolute;
    width: 100%;
    height: 100%;
  }
}
</style>
