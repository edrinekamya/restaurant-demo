<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import { validateNumeric } from '@/util'
import { computed } from 'vue'

const cart = useCartStore()

const isEmpty = computed(() => !cart.phoneNumber)
const isMTN = computed(() => isEmpty.value || cart.isMTN)
const isAIRTEL = computed(() => isEmpty.value || cart.isAIRTEL)

const isValidMobileMoneyNumber = computed(() => !isEmpty.value && cart.phoneNumber.length === 8)

const formattedNumber = computed({
  get: () => cart.phoneNumber.replace(/^(.{2})/, '$1 '),
  set: (value) => (cart.phoneNumber = value.replace(/\s/g, ''))
})

function handleKeyDown(event: any) {
  validateNumeric(event)
  const value = event.target.value + event.key
  if (!['0', '4', '5', '6', '7', '8'].includes(value.charAt(0))) {
    event.preventDefault()
  }
}
</script>

<template>
  <form
    @submit.prevent="cart.processPayment('Mobile', isAIRTEL ? 'AIRTEL' : 'MTN')"
    class="column gap"
  >
    <section class="gap-s column">
      <p>Phone number</p>
      <section
        :class="{
          invalid: formattedNumber && !isValidMobileMoneyNumber
        }"
        class="row number"
      >
        <span class="ellipsis">+256 7</span>
        <input
          @keydown="handleKeyDown"
          class="flex phone"
          id="mobileMoneyNumber"
          v-model="formattedNumber"
          placeholder="xxx xxxxxx"
          maxlength="9"
        />
        <section class="row gap-s">
          <img v-if="isAIRTEL" class="logo" src="../assets/logo/airtel-logo.png" alt="" />
          <img v-if="isMTN" class="logo" src="../assets/logo/mtn-logo.png" alt="" />
        </section>
      </section>
    </section>
    <input :disabled="!isValidMobileMoneyNumber" type="submit" value="Pay" class="center button" />
  </form>
</template>

<style scoped>
form {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.logo {
  height: 24px;
  width: 24px;
}

span {
  font-size: 16px;
}

input {
  padding: 0;
  font-size: 16px;
  /* padding-top: 3px; */
  font-weight: bold;
  position: relative;
  min-width: 32px;
}

.phone {
  color: var(--color-text);
}

.number {
  height: var(--action-height);
  padding: var(--padding);
  border: 1px solid grey;
  border-radius: var(--border-radius-m);
}

.invalid {
  border: 1px solid red;
  color: red;
}

.invalid > input {
  color: red;
}
</style>
