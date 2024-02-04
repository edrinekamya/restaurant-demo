<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import TheSideBar from './TheSideBar.vue'
import TheCartItem from './TheCartItem.vue'
import TheBackButton from './TheBackButton.vue'

const cart = useCartStore()
</script>

<template>
  <TheSideBar :is-shown="cart.isShown" :size="cart.total">
    <section class="flex column the-cart">
      <header class="sticky">
        <section class="row spaced">
          <TheBackButton @press="cart.isShown = false">Order Details</TheBackButton>
          <button @click="cart.clear" class="cancel gap-s center">
            Clear <v-icon class="close" name="io-close-circle" />
          </button>
        </section>
      </header>
      <section class="column flex items">
        <TransitionGroup name="list">
          <TheCartItem v-for="[item, qty] in cart.items" :key="item.name" :item="item" :qty="qty" />
        </TransitionGroup>
      </section>
      <code class="sticky column">
        <section class="column footer">
          <section class="row spaced">
            <span>Item count</span>
            <span>{{ cart.total }}</span>
          </section>
          <section class="row spaced">
            <span>Total cost</span>
            <span>${{ cart.totalCost.toFixed(3) }}</span>
          </section>
          <section class="danger row spaced">
            <span>Discount</span>
            <span>-${{ cart.discountedTotal.toFixed(3) }}</span>
          </section>
        </section>
        <section class="column footer">
          <section class="row spaced">
            <span class="bold">Payout</span>
            <span>${{ cart.payout.toFixed(3) }}</span>
          </section>
          <button @click="cart.isPaymentFormShown = true" class="checkout">Checkout</button>
        </section>
      </code>
    </section>
  </TheSideBar>
</template>

<style scoped>
.cancel {
  background: #eeeeee;
  border-radius: var(--border-radius-m);
  padding: var(--padding-s);
  height: var(--action-height);
  color: gray;
}

.close {
  height: 16px;
  width: 16px;
}

code {
  bottom: 0;
}

.footer {
  border-top: 1px dashed grey;
  padding: var(--padding);
  gap: var(--padding-s);
}

header {
  padding: var(--padding);
  top: 0;
}

.checkout {
  background: var(--color-background-2);
  color: white;
  height: var(--action-height);
  padding: var(--padding-s);
  border-radius: var(--border-radius-m);
}

.items {
  gap: var(--padding);
  padding: var(--padding);
  padding-top: 0;
}

.the-cart {
  background: linear-gradient(to bottom, var(--bg-white), var(--color-background));
}
</style>
