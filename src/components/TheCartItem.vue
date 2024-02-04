<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import { computed } from 'vue'

const cart = useCartStore()
const props = defineProps<{
  item: Item
  qty: number
}>()
const payout = computed(() => (props.item.price * (1 - cart.discount) * props.qty).toFixed(3))
</script>

<template>
  <article class="shadow row item">
    <div class="image"></div>
    <section class="flex column">
      <section class="row spaced">
        <span class="ellipsis">{{ item.name }}</span>
        <b>x{{ qty }}</b>
      </section>
      <section class="row spaced">
        <b>${{ payout }}</b>
        <section class="actions row">
          <v-icon name="bi-cart-plus-fill" class="icon action" @click="cart.add(item)" />
          <v-icon name="bi-cart-dash-fill" class="icon grey" @click="cart.decrement(item)" />
          <v-icon name="bi-cart-x-fill" class="icon danger" @click="cart.remove(item)" />
        </section>
      </section>
    </section>
  </article>
</template>

<style scoped>
.actions {
  column-gap: var(--padding-s);
}

.icon {
  width: 24px;
}

.item {
  background: var(--bg-white);
  padding: var(--padding-s);
  border-radius: var(--border-radius-m);
  column-gap: var(--padding-s);
}

.item > .column {
  gap: var(--padding-s);
}

.order-price {
  font-size: 12px;
  color: grey;
}

.image {
  width: 48px;
  height: 48px;
  background: var(--color-background-1);
}
</style>
