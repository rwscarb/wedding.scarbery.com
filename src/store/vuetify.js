import Vue from 'vue';

const state = {
  showSnackbar: false,
  snackbarMessage: '',
  showNavigationDrawer: false,
};

const getters = {
  showSnackbar(state) {
    return state.showSnackbar;
  },
  snackbarMessage(state) {
    return state.snackbarMessage;
  },
  showNavigationDrawer(state) {
    return state.showNavigationDrawer;
  },
};

const actions = {
  setShowSnackbar(context, options) {
    context.commit('setShowSnackbar', options);
  },
  setSnackbarMessage(context, options) {
    context.commit('setSnackbarMessage', options);
  },
  sendSnackbarMessage(context, {message}) {
    context.commit('setSnackbarMessage', {message});
    context.commit('setShowSnackbar', {show: true});
  },
  setShowNavigationDrawer(context, {show}) {
    context.commit('setNavigationDrawer', {show: show});
  },
  toggleShowNavigationDrawer(context) {
    const show = context.getters.showNavigationDrawer;
    context.commit('setNavigationDrawer', {show: !show});
  },
};

const mutations = {
  setShowSnackbar(state, {show}) {
    Vue.set(state, 'showSnackbar', show);
  },
  setSnackbarMessage(state, {message}) {
    Vue.set(state, 'snackbarMessage', message);
  },
  setNavigationDrawer(state, {show}) {
    Vue.set(state, 'showNavigationDrawer', show);
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
