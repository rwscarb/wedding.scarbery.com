<template>
    <b-container>
        <b-row>
            <b-col>
                <b-form @submit.prevent="inviteAddress(forms.invitation.address)"
                    autocomplete="off"
                    class="form_invite_address">
                    <b-form-group
                        id="invite_address_form"
                        label="Invite Address:"
                        label-for="invite_address">
                        <b-input-group>
                            <b-form-input
                                id="invite_address"
                                v-model="forms.invitation.address"
                                type="text"
                                placeholder="0x"
                                :disabled="forms.invitation.loading"
                                required
                            ></b-form-input>
                            <b-input-group-append>
                                <async-button :loading="forms.invitation.loading" :disabled="!isAddress(forms.invitation.address)"
                                    variant="outline-secondary" type="submit">Invite</async-button>
                            </b-input-group-append>
                            <b-form-invalid-feedback :state="isAddress(forms.invitation.address)">
                                You must supply a valid Ethereum address
                            </b-form-invalid-feedback>
                            <b-form-invalid-feedback force-show v-if="forms.invitation.errorMessage">
                                {{ forms.invitation.errorMessage }}
                            </b-form-invalid-feedback>
                        </b-input-group>
                    </b-form-group>
                </b-form>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-form @submit.prevent="proposeContract(forms.ipfs_contract_link.hash)"
                    autocomplete="off"
                    class="form_propose_contract">
                    <b-form-group
                        id="propose_contract_form"
                        label="Propose Contract:"
                        label-for="propose_contract">
                        <b-input-group>
                            <b-form-input
                                id="propose_contract"
                                v-model="forms.ipfs_contract_link.hash"
                                type="text"
                                :placeholder="writtenContractIpfsHash"
                                :disabled="!!writtenContractIpfsHash"
                                required
                            ></b-form-input>
                            <b-input-group-append>
                                <async-button type="submit" variant="outline-secondary"
                                    :loading="forms.ipfs_contract_link.loading"
                                    :disabled="!!writtenContractIpfsHash">Propose</async-button>
                            </b-input-group-append>
                        </b-input-group>
                        <b-form-invalid-feedback force-show v-if="forms.ipfs_contract_link.errorMessage">
                            {{ forms.ipfs_contract_link.errorMessage }}
                        </b-form-invalid-feedback>
                        <b-link :href="'https://ipfs.io/ipfs/' + this.writtenContractIpfsHash" target="_blank">
                            View Contract
                        </b-link>
                    </b-form-group>
                </b-form>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-form @submit.prevent="setEncryptionKey(forms.encryption_key.key)">
                    <b-form-group
                        id="set_encryption_key_form_group"
                        label="Set Encryption Key:"
                        label-for="set_encryption_key">
                        <b-input-group>
                            <b-form-input
                                id="set_encryption_key"
                                v-model="forms.encryption_key.key"
                                type="password"
                                :disabled="!writtenContractIpfsHash"
                                required></b-form-input>
                            <b-input-group-append>
                                <async-button type="submit" variant="outline-secondary"
                                    :disabled="!writtenContractIpfsHash">Set</async-button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-form-group>
                </b-form>
                <b-modal ref="encryption_key_set_modal" ok-only centered>Encryption Key Set!</b-modal>
            </b-col>
        </b-row>
        <b-row>
            <b-col class="text-center">
                <b-button type="submit" variant="outline-primary" v-if="contractSigned"
                    @click="divorce"
                    :disabled="contractDivorced">Divorce!
                </b-button>
                <b-button type="submit" variant="outline-primary" v-else
                    @click="signContract"
                    :disabled="!writtenContractIpfsHash">Sign Contract!
                </b-button>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-form @submit.prevent="pay(forms.pay.address, forms.pay.amount)"
                    autocomplete="off"
                    class="form_pay">
                    <b-form-group
                        id="pay_form_group"
                        label="Pay:"
                        label-for="pay_address">
                        <b-input-group>
                            <b-form-input
                                id="pay_address"
                                v-model="forms.pay.address"
                                type="text"
                                placeholder="0x"
                                :disabled="forms.pay.loading"
                                debounce="600"
                                required></b-form-input>
                            <b-form-input
                                id="pay_amount"
                                class="text-center"
                                style="max-width: 7em"
                                v-model="forms.pay.amount"
                                type="number"
                                step="0.0001"
                                :disabled="forms.pay.loading"></b-form-input>
                            <b-input-group-append>
                                <async-button type="submit" variant="outline-secondary"
                                    :loading="forms.pay.loading"
                                    :disabled="forms.pay.loading || !isAddress(forms.pay.address)">Pay</async-button>
                            </b-input-group-append>
                        </b-input-group>
                        <b-form-invalid-feedback :state="isAddress(forms.pay.address)">
                            You must supply a valid Ethereum address
                        </b-form-invalid-feedback>
                        <b-form-invalid-feedback force-show v-if="forms.pay.errorMessage">
                            {{ forms.pay.errorMessage }}
                        </b-form-invalid-feedback>
                    </b-form-group>
                </b-form>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-form @submit.prevent="proposeAsset(forms.asset.data, forms.asset.allocation)"
                    autocomplete="off"
                    class="form_propose_asset">
                    <b-form-group
                        id="propose_asset_form_group"
                        label="Propose Asset:"
                        label-for="propose_asset">
                        <b-input-group>
                            <b-form-input
                                id="propose_asset"
                                v-model="forms.asset.data"
                                type="text"
                                :disabled="!canProposeAsset || forms.asset.loading"
                                required
                            ></b-form-input>
                            <b-form-input
                                id="propose_asset_allocation"
                                v-model="forms.asset.allocation"
                                type="range"
                                min="0"
                                max="100"
                                :disabled="!canProposeAsset"
                                step="1">
                            </b-form-input>
                            <div class="text-center form-control" style="max-width: 5em">
                                {{ forms.asset.allocation + '%' }}
                            </div>
                            <b-input-group-append>
                                <async-button type="submit" variant="outline-secondary"
                                    :loading="forms.asset.loading" :disabled="!canProposeAsset">Propose</async-button>
                            </b-input-group-append>
                        </b-input-group>
                        <b-form-invalid-feedback force-show v-if="forms.asset.errorMessage">
                            {{ forms.asset.errorMessage }}
                        </b-form-invalid-feedback>
                    </b-form-group>
                </b-form>
            </b-col>
        </b-row>
        <b-row align-v="end">
            <b-col>
                <h3>Assets:</h3>
            </b-col>
            <b-col class="text-right">
                <b-form-checkbox v-model="showRemovedAssets">Show Removed</b-form-checkbox>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <div v-if="assets.length">
                    <b-table striped hover :items="assets" :fields="fields.assets" :filter="{removed: this.showRemovedAssets}" :filter-function="filterAssets">
                        <template #cell(added)="data">
                            <div v-if="!data.item.added">
                                <b-button @click="approveAsset(data.item.id)" v-if="!data.item.approved">Approve</b-button>
                                <span v-else>Awaiting Approval</span>
                            </div>
                            <b-icon icon="check-all" v-else></b-icon>
                        </template>
                        <template #cell(removed)="data">
                            <div v-if="!data.item.removed">
                                <b-button @click="removeAsset(data.item.id)" v-if="!data.item.removed" :disabled="!data.item.added">Remove</b-button>
                                <span v-else>Awaiting Removal</span>
                            </div>
                            <b-icon icon="check-all" v-else></b-icon>
                        </template>
                    </b-table>
                </div>
                <i v-else>No assets have been recorded...</i>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import Vue from 'vue';
import { mapGetters } from 'vuex';

import _ from 'lodash';
import CryptoJS from 'crypto-js';

export default {
    data: function () {
        return {
            assets: [],
            encryptionKey: null,
            showRemovedAssets: false,
            forms: {
                invitation: {
                    address: '',
                    loading: false,
                    errorMessage: null
                },
                ipfs_contract_link: {
                    hash: '',
                    loading: false,
                    errorMessage: null
                },
                asset: {
                    data: '',
                    allocation: 100,
                    loading: false,
                    errorMessage: null
                },
                pay: {
                    address: '',
                    amount: 0,
                    loading: false,
                    errorMessage: null
                },
                encryption_key: {
                    key: '',
                    showModal: false
                }
            },
            fields: {
                assets: [{
                    key: 'decrypted',
                    label: 'Data'
                }, {
                    key: 'spouse1Allocation',
                    label: 'Spouse 1 %'
                }, {
                    key: 'spouse2Allocation',
                    label: 'Spouse 2 %'
                }, {
                    key: 'added',
                    label: 'Add'
                }, {
                    key: 'removed',
                    label: 'Remove'
                }]
            }
        }
    },
    computed: {
        writtenContractIpfsHash() {
            return this.getContractDataWithDefault({
                contract: 'SmartWeddingContract',
                method: 'writtenContractIpfsHash',
                return_default: ''
            })
        },
        contractSigned() {
            return this.getContractDataWithDefault({
                contract: 'SmartWeddingContract',
                method: 'signed',
                return_default: false
            })
        },
        contractDivorced() {
            return this.getContractDataWithDefault({
                contract: 'SmartWeddingContract',
                method: 'divorced',
                return_default: false
            })
        },
        assetIds() {
            const data = this.getContractDataWithDefault({
                contract: 'SmartWeddingContract',
                method: 'getAssetIds',
                return_default: []
            })
            return _.map(data, x => this.utils.toBN(x).toNumber());
        },
        SmartWeddingContract() {
            return this.drizzleInstance.contracts.SmartWeddingContract;
        },
        getContractDataWithDefault() {
            return function ({contract, method, return_default}) {
                const data = this.getContractData({
                    contract: contract,
                    method: method
                });
                return data === "loading" ? return_default : data;
            }
        },
        canProposeAsset() {
            return !!(this.contractSigned && this.encryptionKey);
        },
        utils() {
          return this.drizzleInstance.web3.utils;
        },
        ...mapGetters("drizzle", [
            "drizzleInstance",
            "isDrizzleInitialized"
        ]),
        ...mapGetters("contracts", [
            "getContractData"
        ]),
    },
    watch: {
        assetIds() {
            this.fetchAssets();
        }
    },
    methods: {
        async inviteAddress(address) {
            this.forms.invitation.errorMessage = null;
            this.forms.invitation.loading = true;
            try {
                await this.SmartWeddingContract.methods.sendInvitation(address).send();
            } catch (e) {
                this.forms.invitation.errorMessage = e.message;
            } finally {
                this.forms.invitation.address = '';
                this.forms.invitation.loading = false;
            }
        },
        async proposeContract(ipfs_hash) {
            this.forms.ipfs_contract_link.loading = true;
            this.forms.ipfs_contract_link.errorMessage = null;
            try {
                await this.SmartWeddingContract.methods.proposeWrittenContract(ipfs_hash).send();
            } catch (e) {
                this.forms.ipfs_contract_link.errorMessage = e.message;
            } finally {
                this.forms.ipfs_contract_link.hash = '';
                this.forms.ipfs_contract_link.loading = false;
            }
        },
        async proposeAsset(data, allocation) {
            this.forms.asset.errorMessage = null;
            this.forms.asset.loading = true;
            const encryptedData = CryptoJS.AES.encrypt(data, this.encryptionKey).toString();
            try {
                await this.SmartWeddingContract.methods.proposeAsset(encryptedData, allocation, 100 - allocation).send();
            } catch (e) {
                this.forms.asset.errorMessage = e.message;
            } finally {
                this.forms.asset.data = '';
                this.forms.asset.allocation = 100;
                this.forms.asset.loading = false;
            }
        },
        async signContract() {
            try {
                await this.SmartWeddingContract.methods.signContract().send();
            } catch (e) {
                alert(e.message);
            }
        },
        async pay(address, amount) {
            this.forms.pay.errorMessage = null;
            this.forms.pay.loading = true;
            try {
                await this.SmartWeddingContract.methods.pay(address, this.utils.toWei(amount)).send();
            } catch (e) {
                this.forms.pay.errorMessage = e.message;
            } finally {
                this.forms.pay.address = '';
                this.forms.pay.amount = 0;
                this.forms.pay.loading = false;
            }
        },
        async divorce() {
            try {
                await this.SmartWeddingContract.methods.divorce().send();
            } catch (e) {
                alert(e.message);
            }
        },
        async fetchAssets() {
            const assetIds = await this.SmartWeddingContract.methods.getAssetIds().call();
            const assets = await Promise.all(_.map(assetIds, async x => {
                const asset = await this.SmartWeddingContract.methods.assets(x - 1).call();
                asset.id = this.utils.toBN(x).toNumber();
                return asset;
            }));
            _.forEach(assets, x => {
                x.decrypted = CryptoJS.AES.decrypt(x.data, this.encryptionKey).toString(CryptoJS.enc.Utf8);
            });
            Vue.set(this, 'assets', assets);
        },
        async approveAsset(assetId) {
            await this.SmartWeddingContract.methods.approveAsset(assetId).send();
        },
        async removeAsset(assetId) {
            await this.SmartWeddingContract.methods.removeAsset(assetId).send();
        },
        filterAssets(row, filter) {
            return filter.removed ? true : !row.removed;
        },
        async setEncryptionKey(value) {
            localStorage.setItem('encryption-key', value);
            this.encryptionKey = value;
            await this.$refs['encryption_key_set_modal'].show();
            await this.fetchAssets();
        },
        isAddress(address) {
            return address ? this.utils.isAddress(address) : null;
        },
    },
    async mounted() {
        this.forms.encryption_key.key = this.encryptionKey = localStorage.getItem('encryption-key');
        await this.fetchAssets();
    }
}
</script>

<style lang="less" scoped>
</style>