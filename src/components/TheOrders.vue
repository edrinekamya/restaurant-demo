<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import TheSideBar from './TheSideBar.vue'
import TheBackButton from './TheBackButton.vue'

const cart = useCartStore()
</script>

<template>
  <TheSideBar :is-shown="cart.isOrdersShown" :size="cart.orders.length">
    <section class="flex column the-orders">
      <header class="sticky">
        <TheBackButton @press="cart.isOrdersShown = false">Receipts</TheBackButton>
      </header>

      <section class="flex column gap container">
        <TransitionGroup name="list">
          <code
            v-for="order in cart.orders"
            :key="order.orderNumber"
            class="shadow column gap-s order"
          >
            <section class="row spaced">
              <img
                v-if="order.provider == 'AIRTEL'"
                class="logo"
                src="../assets/logo/airtel-logo.png"
                alt=""
              />
              <img
                v-if="order.provider == 'MTN'"
                class="logo"
                src="../assets/logo/mtn-logo.png"
                alt=""
              />
              <img
                v-if="order.provider == 'MASTERCARD'"
                class="logo"
                src="../assets/logo/card.png"
                alt=""
              />
              <img
                v-if="order.provider == 'VISA'"
                class="logo"
                src="../assets/logo/visa.png"
                alt=""
              />
              <img
                v-if="order.provider == 'AMEX'"
                class="logo"
                src="../assets/logo/american-express.png"
                alt=""
              />
              <b>#{{ order.orderNumber + 1 }}</b>
            </section>

            <section class="column details">
              <section class="row spaced">
                <span>Account No.</span>
                <section class="gap-s row">
                  <b>{{ order.accountNumber }}</b>
                </section>
              </section>
              <section class="row spaced">
                <span>Item Count</span>
                <span>{{ order.itemCount }}</span>
              </section>
            </section>
            <section class="row spaced">
              <b>Payout</b>
              <b>${{ order.total.toFixed(3) }}</b>
            </section>
          </code>
        </TransitionGroup>
      </section>
    </section>
  </TheSideBar>
</template>

<style scoped>
.logo {
  height: 20px;
  width: 20px;
}

h1 {
  font-size: 18px;
}

.details {
  border: 1px dashed grey;
  padding: var(--padding-s);
}

.order-number {
  text-align: right;
}

.order {
  padding: var(--padding-s);
  border-radius: var(--border-radius-m);
  background: var(--bg-white);
}

.container,
header {
  padding: var(--padding);
}

.container {
  padding-top: 0;
}

.the-orders {
  background: linear-gradient(to bottom, var(--color-background), var(--bg-white));
}
</style>
