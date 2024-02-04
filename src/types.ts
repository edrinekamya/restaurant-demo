type PaymentMethod = 'Card' | 'Mobile'
type PaymentStep = 'Form' | 'Securing' | 'Validating' | 'Processing' | 'Success'
type PaymentProvider = 'MTN' | 'AIRTEL' | 'VISA' | 'MASTERCARD' | 'AMEX'

interface Item {
  name: string
  category: Category
  price: number
  image: string
}

interface Category {
  name: string
  image: string
}

interface DeliveryOption {
  name: string
}
interface Order {
  itemCount: number
  method: PaymentMethod
  provider: PaymentProvider
  accountNumber: string
  total: number
  orderNumber: number
}
