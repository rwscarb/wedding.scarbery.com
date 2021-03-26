<template>
    <v-app-bar app>
        <v-app-bar-nav-icon @click.stop="toggleShowNavigationDrawer"/>
        <template v-slot:extension>
            <v-tabs align-with-title>
                <v-tab to="/about/timeline">Timeline</v-tab>
                <v-tab to="/about/events">Events</v-tab>
            </v-tabs>
        </template>

        <v-spacer/>

        <contract-status/>

        <router-link class="ml-3" to="/help" href>Help</router-link>
    </v-app-bar>
</template>

<script>
import { SnackbarViewMixin } from '@/mixins/vuetifyMixins.js';
import ContractStatus from '@/components/ContractStatus.vue';

export default {
    components: {ContractStatus},
    mixins: [SnackbarViewMixin],
    methods: {
    },
}
</script>

<style lang="less" scoped>
</style>