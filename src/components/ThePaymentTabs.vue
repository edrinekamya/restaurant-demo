<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import TheCardPaymentForm from './TheCardPaymentForm.vue'
import TheMobilePaymentForm from './TheMobilePaymentForm.vue'
import TheTabBarItem from './TheTabBarItem.vue'

const cart = useCartStore()
</script>

<template>
  <section class="flex column container gap-s">
    <section class="row">
      <TheTabBarItem :method="'Card'" title="Card" />
      <TheTabBarItem :method="'Mobile'" title="Mobile money" />
    </section>

    <section class="tabs flex">
      <Transition name="fade">
        <component
          :is="cart.paymentMethod == 'Card' ? TheCardPaymentForm : TheMobilePaymentForm"
        ></component>
      </Transition>
    </section>
  </section>
</template>

<style scoped>
.tabs {
  position: relative;
}

.container {
  padding: 0 var(--padding);
  position: relative;
}

.fade-enter-from {
  opacity: 0;
}

.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease-in;
}
</style>
