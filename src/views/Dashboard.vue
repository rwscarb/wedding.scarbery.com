<template>
    <div class="dashboard_view">

        <div class="dashboard_item">
            <h3>Address Book</h3>
            <v-container>
                <v-row>
                    <v-col cols="12" md="6" v-for="(item, i) in addressBook" :key="i">
                        <v-card>
                            <v-card-title>
                                <v-row>
                                    <v-col>
                                        {{ item.title }}
                                    </v-col>
                                    <v-col>
                                        <eth-address-link class="text-right ml-2" :address="item.address"/>
                                    </v-col>
                                </v-row>
                            </v-card-title>
                            <v-card-text>
                                {{ item.address }}
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </div>

        <div class="dashboard_item">
            <h3>ERC20 Tokens</h3>
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <v-card>
                            <v-card-title>Add Tokens to MetaMask</v-card-title>
                            <v-card-subtitle>Click to add tokens to MetaMask</v-card-subtitle>
                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="6" class="text-center">
                                            <v-btn
                                                fab
                                                x-large
                                                color="white"
                                                @click="addERCToken(inviteTokenAddress, 'INVITE')"
                                            ><v-icon>mdi-ethereum</v-icon></v-btn>
                                            <div>Invite</div>
                                        </v-col>
                                        <v-col cols="6" class="text-center">
                                            <v-btn
                                                fab
                                                x-large
                                                color="blue"
                                                @click="addERCToken(witnessTokenAddress, 'WED')"
                                            ><v-icon>mdi-ethereum</v-icon></v-btn>
                                            <div>Witness</div>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </div>

        <div class="dashboard_item" v-if="writtenContractIpfsHash">
            <h3>Written Contract</h3>
            <v-container>
                <v-row>
                    <v-col>
                        <v-card>
                            <v-card-text class="text-center">
                                <a :href="`https://ipfs.io/ipfs/${writtenContractIpfsHash}`" target="_blank">
                                    View Contract
                                </a>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </div>
</template>

<script>
import _ from 'lodash';

import { mapGetters } from 'vuex';

import { DrizzleViewMixin } from '@/mixins/drizzleMixins.js';
import EthAddressLink from '@/components/EthAddressLink.vue';

export default {
    name: 'DashboardView',
    mixins: [DrizzleViewMixin],
    computed: {
        addressBook() {
            return [
                {title: 'Contract Address', address: this.SmartWeddingContract.address},
                {title: 'Spouse 1 Address', address: this.spouse1Address},
                {title: 'Spouse 2 Address', address: this.spouse2Address},
            ];
        },
        spouse1Address() {
            return this.getContractData({
                contract: "SmartWeddingContract",
                method: "spouse1Address"
            });
        },
        spouse2Address() {
            return this.getContractData({
                contract: "SmartWeddingContract",
                method: "spouse2Address"
            });
        },
        inviteTokenAddress() {
            return this.getContractData({
                contract: "SmartWeddingContract",
                method: "getInvitationTokenAddress"
            });
        },
        witnessTokenAddress() {
            return this.getContractData({
                contract: "SmartWeddingContract",
                method: "getWitnessTokenAddress"
            });
        },
        writtenContractIpfsHash() {
            return this.getContractData({
                contract: "SmartWeddingContract",
                method: "writtenContractIpfsHash"
            });
        },
        contractSigned() {
            const data = this.getContractData({
                contract: "SmartWeddingContract",
                method: "signed"
            });
            return data === "loading" ? false : data;
        },
        contractDivorced() {
            const data = this.getContractData({
                contract: "SmartWeddingContract",
                method: "divorced"
            });
            return data === "loading" ? false : data;
        },
        contractBalance() {
            const data = this.getContractData({
                contract: "SmartWeddingContract",
                method: "getBalance"
            });
            return data === "loading" ? 0 : _.toNumber(this.utils.fromWei(data));
        },
        ...mapGetters("contracts", [
            "getContractData"
        ]),
    },
    methods: {
        async addERCToken(address, symbol) {
            await this.drizzleInstance.web3.currentProvider.sendAsync({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC20',
                    options: {
                        address,
                        symbol,
                        decimals: 0
                    }
                }
            });
        },
    },
    components: {
        EthAddressLink
    }
}
</script>