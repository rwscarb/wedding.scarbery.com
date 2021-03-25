<template>
    <div class="admin_view">
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