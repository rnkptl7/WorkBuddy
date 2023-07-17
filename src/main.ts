import { createApp } from "vue";
import { createPinia } from "pinia";
import { VueFire, VueFireAuth } from "vuefire";

import App from "./App.vue";
import router from "./router";
import { firebaseApp } from "./firebase";

import App from './App.vue'
import router from './router'
import { firebaseApp } from './firebase'

// Toast
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

import VeeValidation from "./plugin/validation"

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
    components,
    directives,
});

const app = createApp(App);


app.use(VueFire, { firebaseApp })
app.use(ToastPlugin, {className: ['toasting']});
app.use(createPinia())
app.use(vuetify)
app.use(VeeValidation)
app.use(router)

app.mount("#app");
