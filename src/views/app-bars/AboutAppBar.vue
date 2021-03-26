<template>
    <v-app-bar app>
        <v-app-bar-nav-icon @click.stop="toggleShowNavigationDrawer"></v-app-bar-nav-icon>
        <template v-slot:extension>
            <v-tabs align-with-title>
                <v-tab to="/about/timeline">Timeline</v-tab>
                <v-tab to="/about/events">Events</v-tab>
            </v-tabs>
        </template>
    </v-app-bar>
</template>

<script>
import { SnackbarViewMixin } from '@/mixins/vuetifyMixins.js';

export default {
    mixins: [SnackbarViewMixin],
    methods: {
    },
}
</script>

<style lang="less" scoped>
</style>