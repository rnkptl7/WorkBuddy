import { createApp } from "vue";
import { createPinia } from "pinia";
import { VueFire, VueFireAuth } from "vuefire";
import "../src/assets/main.css";

import App from "./App.vue";
import router from "./router";
import { firebaseApp } from "./firebase";

// Toast
import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";

import VeeValidation from "./plugin/validation";

// Vuetify
import "vuetify/styles";
import "@fortawesome/fontawesome-free/css/all.css";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { VDataTable } from "vuetify/labs/VDataTable";

// Icons
import "@mdi/font/css/materialdesignicons.css";
// V Calendar
import { setupCalendar, Calendar, DatePicker } from "v-calendar";
import "v-calendar/style.css";
// Toast
import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";

import VeeValidation from "./plugin/validation";

const vuetify = createVuetify({
    icons: {
        defaultSet: "mdi",
    },

    components: {
        ...components,
        VDataTable,
    },
    directives,
});

const app = createApp(App);

// Register V Calendar globally
app.use(setupCalendar, {});
app.component("VCalendar", Calendar);
app.component("VDatePicker", DatePicker);

app.use(VueFire, { firebaseApp });
app.use(ToastPlugin, { className: ["toasting"] });
app.use(createPinia());
app.use(vuetify);
app.use(VeeValidation);
app.use(router);

app.mount("#app");
