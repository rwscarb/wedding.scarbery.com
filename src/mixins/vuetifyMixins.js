import { mapActions } from 'vuex';

export const SnackbarViewMixin = {
  methods: {
    ...mapActions('vuetify', [
      'sendSnackbarMessage',
      'toggleShowNavigationDrawer',
    ])
  },
}
