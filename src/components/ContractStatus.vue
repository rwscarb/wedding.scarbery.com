<template>
    <div class="contract_status">
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
    </div>
</template>

<script>
import { DrizzleViewMixin } from '@/mixins/drizzleMixins.js';

export default {
    name: 'ContractStatus',
    mixins: [DrizzleViewMixin],
}
</script>

<style scoped>

</style>