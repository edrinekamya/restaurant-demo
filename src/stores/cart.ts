import { acceptHMRUpdate, defineStore } from 'pinia'

const MTNIdentifiers = ['6', '7', '8']
const AIRTELIdentifiers = ['0', '4', '5']

export const useCartStore = defineStore('cartStore', {
  state: () => ({
    entities: new Map<Item, number>(),
    discount: 0.3,
    isShown: false,
    isPaymentFormShown: false,
    isOneClick: false,
    paymentMethod: 'Card' as PaymentMethod,
    paymentStep: 'Form' as PaymentStep,
    paymentMessage: '',
    error: '',
    phoneNumber: '',
    email: '',
    cvc: '',
    name: '',
    cardNumber: '',
    country: 'Uganda',
    ccExp: '',
    isPaymentProgress: false,
    isSnackbarShown: false,
    orders: [] as Order[],
    isOrdersShown: false
  }),

  getters: {
    items: (state) => Array.from(state.entities.entries()),
    size: (state) => state.entities.size,
    totalCost(): number {
      return this.items.reduce((prev, [item, qty]) => prev + item.price * qty, 0)
    },
    discountedTotal(): number {
      return this.totalCost * this.discount
    },
    payout(): number {
      return this.totalCost - this.discountedTotal
    },
    total: (state) => Array.from(state.entities.values()).reduce((a, b) => a + b, 0),
    fullNumber: (state) => '+2567' + state.phoneNumber,
    isMTN: (state) => MTNIdentifiers.includes(state.phoneNumber.charAt(0)),
    isAIRTEL: (state) => AIRTELIdentifiers.includes(state.phoneNumber.charAt(0))
  },
  actions: {
    add(item: Item) {
      this.entities.set(item, (this.entities.get(item) ?? 0) + 1)
    },
    decrement(item: Item) {
      const count = this.entities.get(item) ?? 0
      this.entities.set(item, count - 1)
      if (count - 1 <= 0) {
        this.entities.delete(item)
      }
      if (!this.size) {
        this.isShown = false
      }
    },
    remove(item: Item) {
      this.entities.delete(item)
      if (!this.size) {
        this.isShown = false
      }
    },
    clear() {
      this.entities.clear()
      this.isShown = false
    },

    async processPayment(method: PaymentMethod, provider: PaymentProvider) {
      try {
        this.error = ''
        this.isPaymentProgress = true
        const isMobile = method == 'Mobile'

        // Securing
        this.paymentStep = 'Securing'
        this.paymentMessage = 'Be patient while we secure your payment...'
        await new Promise((resolve) => setTimeout(resolve, 3000))

        // Validating(server-side)
        this.paymentStep = 'Validating'
        this.paymentMessage = isMobile
          ? `Validating your phone number...`
          : 'Validating provided credit card information...'
        await new Promise((resolve) => setTimeout(resolve, 3000))

        const isValid = Math.random() > 0.5
        if (!isValid) {
          this.paymentStep = 'Form'
          this.isPaymentProgress = false
          this.error = `${isMobile ? `${provider} failed to validate your phone number` : 'Your card could be invalid, expired or not active'}.`
          return
        }

        // Processing
        this.paymentStep = 'Processing'
        this.paymentMessage = 'Processing your payment...'
        await new Promise((resolve) => setTimeout(resolve, 3000))

        const isProcessed = Math.random() > 0.5
        if (!isProcessed) {
          this.paymentStep = 'Form'
          this.isPaymentProgress = false
          this.error = 'Insufficient funds to complete your payment.'
          return
        }

        // Success, reset state
        this.paymentStep = 'Success'
        this.paymentMessage = 'Payment was processed successfully'
        await new Promise((resolve) => setTimeout(resolve, 1000))

        this.paymentStep = 'Form'
        this.error = ''
        this.isPaymentFormShown = false
        this.isPaymentProgress = false

        const order = {
          itemCount: this.total,
          method,
          provider,
          accountNumber: isMobile ? this.fullNumber : this.cardNumber,
          total: this.totalCost,
          orderNumber: this.orders.length
        }
        this.orders.push(order)
        this.clear()

        if (!this.isOneClick) {
          // only preserver orders
          const orders = this.orders
          this.$reset()
          this.orders = orders
        }
      } catch (error) {
        this.paymentStep = 'Form'
        this.error = 'An unexpected error occurred during the payment process'
      } finally {
        this.isPaymentProgress = false
      }
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
}
