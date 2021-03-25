<template>
    <div class="assets_view">
        <h3>Manage Assets</h3>

        <p>
            Assets are managed on the block chain and must be approved by both parties.
        </p>

        <v-form
            ref="set_encryption_key_form"
            v-model="forms.encryption_key.valid"
            @submit.prevent="setEncryptionKey(forms.encryption_key.key)"
        >
            <v-text-field type="password" label="Set Encryption Key"
                v-model="forms.encryption_key.key"
                :rules="[v => v.length > 10 || 'Encryption key too weak']"
            >
                <template slot="append">
                    <v-btn type="submit" class="mb-2"
                        small
                        :loading="forms.encryption_key.loading"
                        :disabled="!forms.encryption_key.valid"
                    >Set</v-btn>
                </template>
            </v-text-field>
        </v-form>

        <h4>Propose an Asset</h4>
        <v-form
            ref="propose_asset_form"
            v-model="forms.asset.valid"
            @submit.prevent="proposeAsset(forms.asset.data, forms.asset.allocation)"
            :disabled="!canProposeAsset"
        >
            <v-text-field
                v-model="forms.asset.data"
                :loading="forms.asset.loading"
                :rules="[v => !!v || 'You must supply asset data']"
                label="Asset Data"
                autocomplete="off"
            ></v-text-field>
            <v-slider
                v-model="forms.asset.allocation"
                :disabled="!forms.asset.data || forms.asset.loading"
                min="0"
                max="100"
                label="Your allocation"
            >
                <template v-slot:append>
                    <v-text-field type="number" class="mt-0 pt-0" style="width: 60px"
                        v-model="forms.asset.allocation"
                        :loading="forms.asset.loading"
                        hide-details
                        single-line
                    ></v-text-field>%
                </template>
            </v-slider>
            <v-btn type="submit" :loading="forms.asset.loading" :disabled="!forms.asset.valid">Propose</v-btn>
        </v-form>
        <v-simple-table>
            <template v-slot:default>
                <thead>
                <tr>
                    <th>Asset</th>
                    <th>Spouse 1</th>
                    <th>Spouse 2</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(asset, i) in assets" :key="i">
                    <td>{{ asset.decrypted }}</td>
                    <td>{{ asset.spouse1Allocation }}%</td>
                    <td>{{ asset.spouse2Allocation }}%</td>
                    <td>
                        <asset-table-action
                            :asset="asset"
                            :loading="forms.asset.loading_table_action"
                            @approve="approveAsset($event)"
                            @remove="removeAsset($event)"></asset-table-action>
                    </td>
                </tr>
                </tbody>
            </template>
        </v-simple-table>
    </div>
</template>

<script>
import CryptoJS from 'crypto-js';
import _ from 'lodash';
import Vue from 'vue';

import { DrizzleViewMixin } from '@/mixins/drizzleMixins.js';
import AssetTableAction from '@/components/AssetTableAction.vue';

export default {
    name: 'ProposeContractView',
    mixins: [DrizzleViewMixin],
    data: (() => {
        return {
            encryptionKey: '',
            assets: [],
            forms: {
                asset: {
                    loading: false,
                    valid: false,
                    loading_table_action: false,
                    data: '',
                    allocation: 100,
                },
                encryption_key: {
                    loading: false,
                    valid: false,
                    key: '',
                },
            }
        }
    }),
    watch: {
        assetIds() {
            this.fetchAssets();
        }
    },
    computed: {
        canProposeAsset() {
            return !!(this.contractSigned && this.encryptionKey);
        },
        contractSigned() {
            return this.getContractDataWithDefault({
                contract: 'SmartWeddingContract',
                method: 'signed',
                return_default: false
            });
        },
        contractDivorced() {
            return this.getContractDataWithDefault({
                contract: 'SmartWeddingContract',
                method: 'divorced',
                return_default: false
            });
        },
        assetIds() {
            const data = this.getContractDataWithDefault({
                contract: 'SmartWeddingContract',
                method: 'getAssetIds',
                return_default: []
            });
            return _.map(data, x => this.utils.toBN(x).toNumber());
        },
    },
    methods: {
        async fetchAssets() {
            const assetIds = await this.SmartWeddingContract.methods.getAssetIds().call();
            const assets = await Promise.all(_.map(assetIds, async x => {
                const asset = await this.SmartWeddingContract.methods.assets(x - 1).call();
                asset.id = this.utils.toBN(x).toNumber();
                return asset;
            }));
            _.forEach(assets, x => {
                try {
                    x.decrypted = CryptoJS.AES.decrypt(x.data, this.encryptionKey).toString(CryptoJS.enc.Utf8);
                } catch {
                    x.decrypted = '**ENCRYPTED**';
                }
            });
            Vue.set(this, 'assets', assets);
        },
        async proposeAsset(data, allocation) {
            this.forms.asset.loading = true;
            const encryptedData = CryptoJS.AES.encrypt(data, this.encryptionKey).toString();
            try {
                await this.SmartWeddingContract.methods.proposeAsset(encryptedData, allocation, 100 - allocation).send();
            } catch (e) {
                this.sendSnackbarMessage(e);
            } finally {
                this.forms.asset.loading = false;
                this.$refs.propose_asset_form.reset();
            }
        },
        async approveAsset(asset) {
            this.forms.asset.loading_table_action = true;
            try {
                await this.SmartWeddingContract.methods.approveAsset(asset.id).send();
            } catch (e) {
                this.sendSnackbarMessage(e);
            } finally {
                this.forms.asset.loading_table_action = false;
            }
        },
        async removeAsset(asset) {
            this.forms.asset.loading_table_action = true;
            try {
                await this.SmartWeddingContract.methods.removeAsset(asset.id).send();
            } catch (e) {
                this.sendSnackbarMessage(e);
            } finally {
                this.forms.asset.loading_table_action = false;
            }
        },
        async setEncryptionKey(value) {
            try {
                localStorage.setItem('encryption-key', value);
                this.encryptionKey = value;
                this.snackbarMessage = 'Encryption key has been set';
            } catch {
                this.snackbarMessage = 'Error while attempting to use local storage';
            } finally {
                this.showSnackbar = true;
            }
            await this.fetchAssets();
        },
    },
    mounted() {
        this.forms.encryption_key.key = this.encryptionKey = localStorage.getItem('encryption-key');
    },
    components: {
        AssetTableAction
    }
}
</script>

<style scoped>

</style>