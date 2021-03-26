import Vue from "vue";
import VueGtag from "vue-gtag";


if (process.env.NODE_ENV === 'production') {
  Vue.use(VueGtag, {
    config: {
      id: process.env.GTAG_ID,
      params: {
        send_page_view: false
      }
    }
  });
}