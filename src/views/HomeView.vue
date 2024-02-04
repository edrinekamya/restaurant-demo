<script setup lang="ts">
import TheMainContent from '@/components/TheMainContent.vue'
import { useCartStore } from '@/stores/cart'
import TheOrders from '@/components/TheOrders.vue'
import TheFloatingIcon from '@/components/TheFloatingIcon.vue'
import TheCart from '@/components/TheCart.vue'
import ThePaymentModal from '@/components/ThePaymentModal.vue'

const cart = useCartStore()
function closeAll() {
  cart.isShown = false
  cart.isOrdersShown = false
}
</script>

<template>
  <main @click="closeAll">
    <ThePaymentModal />
    <TheMainContent />
    <TheCart />
    <TheOrders />
    <div v-if="!cart.isShown" class="cart fixed">
      <TheFloatingIcon :size="64" @press="cart.isShown = true" :quantity="cart.total"
        ><v-icon name="hi-shopping-cart" class="icon"
      /></TheFloatingIcon>
    </div>
    <div v-if="!cart.isOrdersShown" class="orders fixed">
      <TheFloatingIcon :size="64" @press="cart.isOrdersShown = true" :quantity="cart.orders.length"
        ><v-icon name="md-receiptlong" class="icon"
      /></TheFloatingIcon>
    </div>
  </main>
</template>

<style scoped>
.fixed {
  position: absolute;
  bottom: var(--padding);

  z-index: 2;
}

.cart {
  right: var(--padding);
}

.orders {
  left: var(--padding);
}

main {
  display: grid;
  grid-template-columns: 1fr auto auto;
  grid-template-rows: 1fr;
  flex: 1;
  position: relative;
}
</style>
