// import * as Sentry from "@sentry/vue";
// import { Integrations } from "@sentry/tracing";

import Vue from "vue";
import VueRouter from "vue-router";

import App from "./App.vue";
import store from "./store";
import drizzleVuePlugin from "@drizzle/vue-plugin";
import drizzleOptions from "./drizzleOptions";
import VueConfetti from "vue-confetti";

import { router } from "@/routes.js"
import AsyncButton from '@/components/base/AsyncButton.vue';
import vuetify from './plugins/vuetify';


// Sentry.init({
//   Vue: Vue,
//   dsn: "https://71d62fd28c8546c884b4fa43bd7696a8@o556458.ingest.sentry.io/5687401",
//   integrations: [new Integrations.BrowserTracing()],
//   tracesSampleRate: 1.0,
// });

Vue.config.productionTip = false;

Vue.use(drizzleVuePlugin, {store, drizzleOptions});
Vue.use(VueRouter);
Vue.use(VueConfetti);

// todo: dir based import of base components
Vue.component('async-button', AsyncButton);

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
