<script setup lang="ts">
import { countryList } from '@/data'
import {
  amexRegex,
  cardFormatRegex,
  cvcRegex,
  emailRegex,
  masterCardRegex,
  nameRegex,
  visaRegex
} from '@/regex'
import { useCartStore } from '@/stores/cart'
import { validateCardNumber, validateNumeric } from '@/util'
import { computed } from 'vue'

const cart = useCartStore()

const formattedCcExp = computed({
  get: () => cart.ccExp.replace(/^(.{2})/, '$1 / '),
  set: (value) => (cart.ccExp = value.replace(/[^0-9]/g, ''))
})

const formattedCardNumber = computed({
  get: () => cart.cardNumber.replace(/(\d{4})(?=\d)/g, '$1 '),
  set: (value) => (cart.cardNumber = value.replace(/\s/g, ''))
})

const isCardEmpty = computed(() => !cart.cardNumber)
const isMasterCard = computed(() => isCardEmpty.value || masterCardRegex.test(cart.cardNumber))
const isVisa = computed(() => isCardEmpty.value || visaRegex.test(cart.cardNumber))
const isAmex = computed(() => isCardEmpty.value || amexRegex.test(cart.cardNumber))

const emailValid = computed(() => emailRegex.test(cart.email))
const ccExpValid = computed(() => cart.ccExp.length === 4)
const cvcValid = computed(() => cvcRegex.test(cart.cvc))
const nameValid = computed(() => nameRegex.test(cart.name))
const countryValid = computed(() => countryList.includes(cart.country))
const isCardFormatValid = computed(
  () =>
    cardFormatRegex.test(formattedCardNumber.value) &&
    (isAmex.value || isMasterCard.value || isVisa.value) &&
    validateCardNumber(cart.cardNumber)
)

const isFormValid = computed(
  () =>
    emailValid.value &&
    ccExpValid.value &&
    cvcValid.value &&
    nameValid.value &&
    countryValid.value &&
    isCardFormatValid.value
)

function validateCcExp(event: any) {
  validateNumeric(event)
  const key = event.key
  const value = event.target.value + key
  const month = parseInt(value.slice(0, 2))
  const year = parseInt(value.slice(3))

  if ((value.length === 2 && month > 12) || (value.length === 4 && year < 19)) {
    event.preventDefault()
  }
}
</script>

<template>
  <form
    @submit.prevent="
      cart.processPayment('Card', isAmex ? 'AMEX' : isMasterCard ? 'MASTERCARD' : 'VISA')
    "
    class="flex gap column"
  >
    <section class="column gap-s">
      <p>Email</p>
      <input
        v-model="cart.email"
        :class="{ invalid: cart.email && !emailValid }"
        required
        type="email"
      />
    </section>
    <section class="gap-s column">
      <p>Card information</p>
      <section
        class="card-container gap-s row"
        :class="{ invalid: !isCardEmpty && !isCardFormatValid }"
      >
        <input
          @keydown="validateNumeric"
          :maxlength="19"
          v-model="formattedCardNumber"
          class="card-number flex"
          required
          autocomplete="cc-number"
          placeholder="1234 1234 1234 1234"
          type="text"
        />
        <img v-if="isMasterCard" class="logo" src="../assets/logo/card.png" alt="" />
        <img v-if="isVisa" class="logo" src="../assets/logo/visa.png" alt="" />
        <img v-if="isAmex" class="logo" src="../assets/logo/american-express.png" alt="" />
      </section>
      <span class="danger" v-if="!isCardEmpty && !isCardFormatValid">Invalid card number</span>
      <section class="flex cc-row row gap-s">
        <input
          class="half"
          @keydown="validateCcExp"
          maxlength="7"
          v-model="formattedCcExp"
          :class="{ invalid: formattedCcExp && !ccExpValid }"
          required
          autocomplete="cc-exp"
          placeholder="MM / YY"
          type="text"
        />
        <input
          class="half"
          maxlength="3"
          @keydown="validateNumeric"
          v-model="cart.cvc"
          :class="{ invalid: cart.cvc && !cvcValid }"
          required
          autocomplete="cc-csc"
          placeholder="CVC"
          type="text"
        />
      </section>
    </section>
    <section class="gap-s column">
      <p>Cardholder name</p>
      <input
        v-model="cart.name"
        :class="{ invalid: cart.name && !nameValid }"
        required
        autocomplete="cc-name"
        placeholder="Full name on card"
        type="text"
      />
    </section>
    <section class="gap-s column">
      <p>Country or region</p>
      <select v-model="cart.country" :class="{ invalid: cart.country && !countryValid }" required>
        <option v-for="country in countryList" :key="country" :value="country">
          {{ country }}
        </option>
      </select>
    </section>
    <section class="column gap-s">
      <section class="gap-s row">
        <input v-model="cart.isOneClick" type="checkbox" name="save" id="save" />
        <p class="row">Securely save my information for 1-click checkout</p>
      </section>
     
    </section>
  </form>
</template>

<style scoped>
.half {
  min-width: 10px;
}

form {
  row-gap: var(--padding);
  overflow: auto;
}

form {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: auto;
}

span.danger {
  font-size: 12px;
}

.card-container {
  padding: var(--padding);
}

input,
select,
.card-container {
  border: 1px solid grey;
  border-radius: var(--border-radius-m);
}

button,
.card-container,
select,
input {
  height: var(--action-height);
  padding: 0 var(--padding);
}

.card-number {
  border: none;
  padding: 0;
}

.invalid {
  border: 1px solid red;
  color: red;
}

.invalid > input {
  color: red;
}
</style>
