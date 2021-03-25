<template>
    <div class="asset_table_action">
        <v-btn v-if="asset.removed"
            class="mx-2"
            fab
            dark
            x-small
        ><v-icon>mdi-skull-crossbones-outline</v-icon></v-btn>
        <v-btn v-else-if="asset.added"
            @click="$emit('remove', asset)"
            class="mx-2"
            title="Click to remove asset"
            fab
            dark
            x-small
            ><v-icon>mdi-trash-can-outline</v-icon></v-btn>
        <v-btn v-else
            @click="$emit('approve', asset)"
            class="mx-2"
            color="pink"
            title="Click to approve asset"
            fab
            dark
            x-small
            ><v-icon>mdi-heart</v-icon></v-btn>
    </div>
</template>

<script>
export default {
    name: 'AssetTableAction',
    props: ['asset', 'contract'],
}
</script>

<style scoped>

</style>