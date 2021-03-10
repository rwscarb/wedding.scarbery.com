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
                                required
                            ></b-form-input>
                            <b-input-group-append>
                                <b-button type="submit" variant="outline-secondary">Invite</b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-form-group>
                </b-form>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-form @submit.prevent="proposeContract(forms.ipfs_contract_link.link)"
                    autocomplete="off"
                    class="form_propose_contract">
                    <b-form-group
                        id="propose_contract_form"
                        label="Propose Contract:"
                        label-for="propose_contract">
                        <b-input-group>
                            <b-form-input
                                id="propose_contract"
                                v-model="forms.ipfs_contract_link.link"
                                type="text"
                                :placeholder="writtenContractIpfsHash"
                                :disabled="!!writtenContractIpfsHash"
                                required
                            ></b-form-input>
                            <b-input-group-append>
                                <b-button type="submit" variant="outline-secondary"
                                    :disabled="!!writtenContractIpfsHash">Propose</b-button>
                            </b-input-group-append>
                        </b-input-group>
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
                                <b-button type="submit" variant="outline-secondary"
                                    :disabled="!writtenContractIpfsHash">Set</b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-form-group>
                </b-form>
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
                                :disabled="!canProposeAsset"
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
                            <b-form-input
                                class="text-center"
                                type="text"
                                :value="forms.asset.allocation + '%'"
                                :disabled="!canProposeAsset"
                                required
                            ></b-form-input>
                            <b-input-group-append>
                                <b-button type="submit" variant="outline-secondary"
                                    :disabled="!canProposeAsset">Propose</b-button>
                            </b-input-group-append>
                        </b-input-group>
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
                                <b-button @click="approveAsset(data.item.id)" v-if="!data.item.isApproved">Approve</b-button>
                                <span v-else>Awaiting Approval</span>
                            </div>
                            <b-icon icon="check-all" v-else></b-icon>
                        </template>
                        <template #cell(removed)="data">
                            <div v-if="!data.item.removed">
                                <b-button @click="removeAsset(data.item.id)" v-if="!data.item.isRemoved" :disabled="!data.item.added">Remove</b-button>
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
                },
                ipfs_contract_link: {
                    link: ''
                },
                asset: {
                    data: '',
                    allocation: 100,
                },
                encryption_key: {
                    key: ''
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
                    label: 'Added'
                }, {
                    key: 'removed',
                    label: 'Removed'
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
            await this.SmartWeddingContract.methods.sendInvitation(address).send();
            this.forms.invitation.address = '';
        },
        async proposeContract(ipfs_hash) {
            await this.SmartWeddingContract.methods.proposeWrittenContract(ipfs_hash).send();
            this.forms.ipfs_contract_link.link = '';
        },
        async proposeAsset(data, allocation) {
            const encryptedData = CryptoJS.AES.encrypt(data, this.encryptionKey).toString();
            await this.SmartWeddingContract.methods.proposeAsset(encryptedData, allocation, 100 - allocation).send();
            this.forms.asset.data = '';
            this.forms.asset.allocation = 100;
        },
        async signContract() {
            await this.SmartWeddingContract.methods.signContract().send();
        },
        async divorce() {
            await this.SmartWeddingContract.methods.divorce().send();
        },
        async fetchAssets() {
            const assetIds = await this.SmartWeddingContract.methods.getAssetIds().call();
            const assets = await Promise.all(_.map(assetIds, async x => {
                const asset = await this.SmartWeddingContract.methods.assets(x - 1).call();
                asset.id = this.utils.toBN(x).toNumber();
                asset.isApproved = await this.SmartWeddingContract.methods.assetIsApproved(asset.id).call();
                asset.isRemoved = await this.SmartWeddingContract.methods.assetIsRemoved(asset.id).call();
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
        setEncryptionKey(value) {
            localStorage.setItem('encryption-key', value);
            this.encryptionKey = value;
        },
    },
    async mounted() {
        this.forms.encryption_key.key = this.encryptionKey = localStorage.getItem('encryption-key');
        await this.fetchAssets();
    }
}
</script>

<style lang="less" scoped>
#propose_asset {
    flex-grow: 4;
}
#propose_asset_allocation {
    flex-grow: 2;
}
</style>