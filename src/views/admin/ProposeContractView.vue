<template>
    <div class="propose_contract_view">
        <h3>Propose Written Contract</h3>

        <p>
            A standard prenuptual agreement is signed and uploaded to IPFS. It's hash is stored as a reference.
        </p>

        <v-form
            v-model="forms.ipfs_contract_link.valid"
            @submit.prevent="proposeContract(forms.ipfs_contract_link.hash)"
            ref="ipfs_contract_link_form"
        >
            <v-text-field
                v-model="forms.ipfs_contract_link.hash"
                :loading="forms.ipfs_contract_link.loading"
                :rules="[v => !!v || 'Must be a valid ipfs hash']"
                :placeholder="writtenContractIpfsHash"
                :disabled="!!writtenContractIpfsHash"
                :label="writtenContractIpfsHash || 'Propose Contract'"
                autocomplete="off"
                required
            ></v-text-field>
            <a v-if="!!writtenContractIpfsHash" :href="`https://ipfs.io/ipfs/${writtenContractIpfsHash}`" target="_blank">View Contract</a>
            <v-btn v-else type="submit" :loading="forms.ipfs_contract_link.loading" :disabled="!forms.ipfs_contract_link.valid">Propose</v-btn>
        </v-form>
    </div>
</template>

<script>
import { DrizzleViewMixin } from '@/mixins/drizzleMixins.js';
import { SnackbarViewMixin } from '@/mixins/vuetifyMixins.js';

export default {
    name: 'ProposeContractView',
    mixins: [DrizzleViewMixin, SnackbarViewMixin],
    data: (() => {
        return {
            forms: {
                ipfs_contract_link: {
                    valid: false,
                    loading: false,
                    hash: '',
                },
            }
        }
    }),
    computed: {
        writtenContractIpfsHash() {
            return this.getContractDataWithDefault({
                contract: 'SmartWeddingContract',
                method: 'writtenContractIpfsHash',
                return_default: ''
            })
        },
    },
    methods: {
        async proposeContract(ipfs_hash) {
            this.forms.ipfs_contract_link.loading = true;
            try {
                await this.SmartWeddingContract.methods.proposeWrittenContract(ipfs_hash).send();
            } catch (e) {
                this.sendSnackbarMessage({message: e.message});
            } finally {
                this.forms.ipfs_contract_link.loading = false;
                this.$refs.ipfs_contract_link_form.reset();
            }
        },
    },
}
</script>

<style scoped>

</style>