import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueFire } from 'vuefire'

import App from './App.vue'
import router from './router'
import { firebaseApp } from './firebase'

// Toast
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

import VeeValidation from "./plugin/validation"

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VDataTable } from 'vuetify/labs/VDataTable'

// Icons
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  components: {
    ...components,
    VDataTable
  },
    directives,
    icons: {
      defaultSet: 'mdi',
    },
  })

const app = createApp(App)

app.use(VueFire, { firebaseApp })
app.use(ToastPlugin, {className: ['toasting']});
app.use(createPinia())
app.use(vuetify)
app.use(VeeValidation)
app.use(router)

app.mount('#app')
