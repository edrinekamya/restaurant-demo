<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import { computed } from 'vue'

const cart = useCartStore()
const props = defineProps<{
  method: PaymentMethod
  title: string
}>()
const selected = computed(() => cart.paymentMethod === props.method)
</script>

<template>
  <button
    :class="{
      selected
    }"
    @click="cart.paymentMethod = method"
    class="flex center grey"
  >
    <h4 class="ellipsis">{{ title }}</h4>
  </button>
</template>

<style scoped>
button {
  height: var(--action-height);
  transition: all 0.3s ease-in;
}

button:hover {
  background: var(--color-background-1);
}

.selected {
  border-bottom: 2px solid var(--color-background-2);
  color: var(--color-background-2);
  padding: var(--padding-s);
}
</style>
