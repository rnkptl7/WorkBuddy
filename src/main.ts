import "./assets/main.css";

import { createPinia } from "pinia";
import { createApp } from "vue";

const pinia = createPinia();

import { VueFire, VueFireAuth } from "vuefire";

import App from "./App.vue";
import router from "./router";
import { firebaseApp } from "./firebase";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import "material-design-icons-iconfont/dist/material-design-icons.css";

const vuetify = createVuetify({
    components,
    directives,
});

const app = createApp(App);

app.use(VueFire, { firebaseApp });

app.use(pinia);
app.use(vuetify);
app.use(router);

app.mount("#app");
