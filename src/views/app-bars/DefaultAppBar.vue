<template>
    <v-app-bar app>
        <v-app-bar-nav-icon @click.stop="toggleShowNavigationDrawer"></v-app-bar-nav-icon>
    </v-app-bar>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'DefaultAppBar',
    methods: {
        ...mapActions('vuetify', [
            'sendSnackbarMessage',
            'toggleShowNavigationDrawer'
        ]),
    },
}
</script>

<style lang="less" scoped>
</style>