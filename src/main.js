import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import VueRouter from "vue-router";
import drizzleVuePlugin from "@drizzle/vue-plugin";
import drizzleOptions from "./drizzleOptions";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import { router } from "@/routes.js"
import AsyncButton from '@/components/base/AsyncButton.vue';

Vue.config.productionTip = false;

Vue.use(drizzleVuePlugin, {store, drizzleOptions});
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueRouter);

// todo: dir based import of base components
Vue.component('async-button', AsyncButton);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
