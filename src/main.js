import Vue from "vue";

import App from "./App.vue";
import store from "./store";

import "@/plugins/vueConfetti.js";
import "@/plugins/drizzle.js";
import { router } from "@/plugins/router.js"
import vuetify from "@/plugins/vuetify";

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
