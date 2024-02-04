<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import { VueSpinnerOval, VueSpinnerGears } from 'vue3-spinners'
import ThePaymentTabs from './ThePaymentTabs.vue'
import { computed } from 'vue'

const cart = useCartStore()
const isOverlayOpen = computed(
  () => cart.isPaymentProgress && !cart.error && !(cart.paymentStep === 'Form')
)
</script>

<template>
  <Transition name="fade">
    <div @click="cart.isPaymentFormShown = false" v-show="cart.isPaymentFormShown" class="overlay">
      <div @click.stop="null" class="flex column content">
        <button class="close center" @click="cart.isPaymentFormShown = false">
          <v-icon class="icon" name="io-close-circle" color="red" />
        </button>
        <section class="column header">
          <h1 class="app-logo"><i>FoodHub</i></h1>
          <section class="row spaced">
            <span>Payout</span>
            <span>${{ cart.payout.toFixed(3) }}</span>
          </section>
        </section>
        <section class="error gap-s center row" v-if="cart.error">
          <v-icon class="icon" color="white" name="md-error-round" />
          <p>{{ cart.error }}</p>
        </section>
        <ThePaymentTabs />
      </div>
      <Transition>
        <div v-if="isOverlayOpen" @click.stop="null" class="payment-overlay center">
          <section class="row gap-s">
            <div v-if="cart.paymentStep === 'Processing'" class="spinner">
              <VueSpinnerGears color="dodgerblue" />
            </div>
            <v-icon
              v-else-if="cart.paymentStep === 'Success'"
              color="green"
              class="spinner"
              name="bi-check-circle-fill"
            />
            <div v-else class="center spinner">
              <VueSpinnerOval color="dodgerblue" />
              <v-icon v-if="cart.paymentStep === 'Securing'" class="lock" name="fa-lock" />
              <v-icon
                v-else-if="cart.paymentStep === 'Validating'"
                class="lock"
                name="md-verifieduser-round"
              />
            </div>
            <span
              :class="{
                success: cart.paymentStep === 'Success'
              }"
              class="message"
              >{{ cart.paymentMessage }}</span
            >
          </section>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<style scoped>
.message {
  color: dodgerblue;
}

.close {
  position: absolute;
  right: var(--padding-s);
  padding: var(--padding-s);
  border-radius: var(--border-radius-r);
  top: var(--padding-s);
}

.close:hover,
.close:active {
  background: var(--bg-grey);
}

.success {
  color: green;
}

.error {
  background: red;
  color: white;
  left: 0;
  right: 0;
  padding: var(--padding-s) var(--padding);
}

.icon,
.lock {
  height: 20px;
  width: 20px;
}

.lock {
  position: absolute;
  color: dodgerblue;
}

.spinner {
  height: 40px;
  width: 40px;
  position: relative;
}

.payment-overlay {
  backdrop-filter: blur(4px);
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  padding: var(--padding);
}

button,
input {
  height: var(--action-height);
  padding: var(--padding);
}

input {
  border: 1px solid grey;
  border-radius: var(--border-radius-m);
}

input {
  height: var(--action-height);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in;
}

.overlay {
  position: fixed;
  display: flex;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  padding: var(--padding);
  z-index: 15;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
}

.content {
  background: var(--bg-white);
  border-radius: var(--border-radius-m);
  position: relative;
}

.tabs {
  padding: var(--padding);
}

.header {
  border-bottom: 1px solid grey;
  padding: var(--padding);
  row-gap: var(--padding-s);
}
</style>
