import Vue from 'vue'
import Vuex from 'vuex'

import vuetify from '@/store/vuetify.js';
import events from '@/store/events.js';
import settings from '@/store/settings.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    vuetify,
    events,
    settings,
  }
});
