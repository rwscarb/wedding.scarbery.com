import Vue from 'vue'
import Vuex from 'vuex'

import vuetify from '@/store/vuetify.js';
import events from '@/store/events.js';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    vuetify,
    events
  }
})
