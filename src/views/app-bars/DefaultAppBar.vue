<template>
    <v-app-bar app>
        <v-app-bar-nav-icon @click.stop="toggleShowNavigationDrawer"></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <v-chip outlined>
            <div v-if="contractDivorced">
                Divorced <v-icon color="black" class="ml-1">mdi-heart-broken</v-icon>
            </div>
            <div v-else-if="contractSigned">
                Signed <v-icon color="red" class="ml-1">mdi-heart</v-icon>
            </div>
            <div v-else>
                Not Signed <v-icon color="grey" class="ml-1">mdi-heart</v-icon>
            </div>
        </v-chip>
    </v-app-bar>
</template>

<script>
import { mapActions } from 'vuex';
import { DrizzleViewMixin } from '@/mixins/drizzleMixins.js';

export default {
    name: 'DefaultAppBar',
    mixins: [DrizzleViewMixin],
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