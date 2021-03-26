<template>
    <div class="admin_view">
        <h1>Admin</h1>

        <v-divider class="mb-2"/>

        <router-view></router-view>
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