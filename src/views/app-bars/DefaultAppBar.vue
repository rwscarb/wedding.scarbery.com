<template>
    <v-app-bar app>
        <v-app-bar-nav-icon @click.stop="toggleShowNavigationDrawer"/>

        <v-spacer/>

        <contract-status/>

        <router-link class="ml-3" to="/help" href>Help</router-link>
    </v-app-bar>
</template>

<script>
import { mapActions } from 'vuex';

import { DrizzleViewMixin } from '@/mixins/drizzleMixins.js';
import ContractStatus from '@/components/ContractStatus.vue';

export default {
    name: 'DefaultAppBar',
    mixins: [DrizzleViewMixin],
    methods: {
        ...mapActions('vuetify', [
            'sendSnackbarMessage',
            'toggleShowNavigationDrawer'
        ]),
    },
    components: {
        ContractStatus
    },
}
</script>

<style lang="less" scoped>
</style>