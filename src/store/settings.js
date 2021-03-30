import config from '@/../config.js';

const state = {
  config,
};

const getters = {
  config(state) {
    return state.config;
  },
};

const actions = {
};

const mutations = {
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
