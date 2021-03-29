import Vue from "vue";

import VueRouter from 'vue-router';

import App from "./App.vue";
import store from "./store";

import "@/plugins/vueConfetti.js";
import "@/plugins/drizzle.js";
import "@/plugins/sentry.js";
import "@/plugins/gtag.js";
import "@/plugins/jsonPretty.js";
import { routes } from "@/plugins/router.js"
import vuetify from "@/plugins/vuetify";


Vue.config.productionTip = false;

if (process.env.NODE_ENV === 'production') {
  // todo: fork drizzle as it won't shutup
  console.groupCollapsed = () => {};
  console.log = () => {};
  console.groupEnd = () => {};
}

// note: this isn't done in router.js due to sitemap.xml compatibility
Vue.use(VueRouter);
const router = new VueRouter({routes});

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
