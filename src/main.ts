import './assets/main.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import { OhVueIcon, addIcons } from 'oh-vue-icons'
import {
  BiCartDashFill,
  BiCartPlusFill,
  BiCartXFill,
  BiCheckCircleFill,
  FaLock,
  HiShoppingCart,
  IoCloseCircle,
  MdErrorRound,
  MdReceiptlong,
  MdVerifieduserRound,
  IoChevronBack
} from 'oh-vue-icons/icons'

addIcons(
  FaLock,
  BiCheckCircleFill,
  MdVerifieduserRound,
  BiCartDashFill,
  BiCartXFill,
  BiCartPlusFill,
  MdErrorRound,
  IoCloseCircle,
  HiShoppingCart,
  MdReceiptlong,
  IoChevronBack
)

const app = createApp(App)
app.component('v-icon', OhVueIcon)

app.use(createPinia())
app.use(router)

app.mount('#app')
