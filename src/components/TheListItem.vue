<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import { computed } from 'vue'

const props = defineProps<{
  item: Item
}>()
const cart = useCartStore()
const discountedPrice = computed(() => ((1 - cart.discount) * props.item.price).toFixed(3))
const quantity = computed(() => cart.entities.get(props.item) ?? 0)
</script>

<template>
  <article class="column grid-item shadow">
    <section class="img-container">
      <img src="" alt="" />
    </section>
    <section class="column item-details">
      <section class="spaced row">
        <section class="details column">
          <p class="ellipsis">{{ item.name }}</p>
          <section class="row item-price">
            <span class="final-price">${{ discountedPrice }}</span>
            <span class="original-price danger">${{ item.price }}</span>
          </section>
        </section>
        <button class="add-to-cart">
          <v-icon name="bi-cart-plus-fill" class="icon" @click.stop="cart.add(item)" />
          <span v-if="quantity" class="counter">{{ quantity }}</span>
        </button>
      </section>
    </section>
    <section class="cart-container"></section>
  </article>
</template>

<style scoped>
.add-to-cart {
  position: relative;
  color: var(--color-background-2);
}

.counter {
  position: absolute;
  right: 0px;
  padding: 0 2px;
  height: 12px;
  color: white;
  font-size: 12px;
  background: var(--color-background-2);
}

.cart-container {
  position: absolute;
  right: var(--padding-s);
  top: var(--padding-s);
}

.details {
  row-gap: var(--padding-xs);
}

.icons {
  align-items: center;
  background: black;
}

.img-container {
  flex: 1;
  border-radius: var(--border-radius-m);
  background: var(--color-background-1);
}

.grid-item {
  display: flex;
  aspect-ratio: 1;
  border-radius: var(--border-radius-m);
  background: var(--bg-white);
  position: relative;
  /* max-width: 250px; */
}

.icon {
  width: 32px;
}

.item-details {
  padding: var(--padding);
  row-gap: var(--padding-xs);
}

.item-bottom-row {
  justify-content: space-between;
}

.item-price {
  gap: var(--padding-xs);
}

.original-price {
  text-decoration: line-through;
  font-size: 12px;
}
</style>
