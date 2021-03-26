const state = {
  events: [],
};

const getters = {
  events(state) {
    return state.events;
  },
};

const actions = {
  addEvent(context, options) {
    context.commit('addEvent', options);
  },
};

const mutations = {
  addEvent(state, event) {
    state.events.push(event);
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
