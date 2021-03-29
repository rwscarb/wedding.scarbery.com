<template>
    <div class="about_view">
        <v-container>
            <h1>About</h1>
            <v-divider class="mb-2"></v-divider>
            <router-view></router-view>
        </v-container>
    </div>
</template>

<script>
import { DrizzleViewMixin } from '@/mixins/drizzleMixins.js';

export default {
    name: 'AboutView',
    mixins: [DrizzleViewMixin]
}
</script>

<style lang="less" scoped>
h2 {
    margin-top: 1em;
}
</style>