<template>
    <div class="admin_view">
        <v-container>
            <h1>Admin</h1>

            <v-divider class="mb-2"/>

            <router-view></router-view>
        </v-container>
    </div>
</template>

<script>
import { DrizzleViewMixin } from '@/mixins/drizzleMixins.js';

export default {
    name: 'AdminView',
    mixins: [DrizzleViewMixin]
}
</script>

<style lang="less" scoped>
</style>