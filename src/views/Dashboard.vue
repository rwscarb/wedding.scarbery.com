<template>
    <div class="dashboard_view">

        <div class="dashboard_item">
            <v-container>
                <v-row justify="center">
                    <v-col cols="12">
                        <v-card class="text-center">
                            <v-card-title class="justify-center">
                                Status
                            </v-card-title>
                            <v-card-subtitle>
                                <template v-if="contractDivorced">
                                    Divorced
                                </template>
                                <template v-else-if="contractSigned">
                                    Married
                                </template>
                                <template v-else>
                                    Engaged
                                </template>
                            </v-card-subtitle>
                            <v-card-text>
                                <template v-if="contractDivorced">
                                    <v-icon x-large>mdi-heart-broken</v-icon>
                                </template>
                                <template v-else-if="contractSigned">
                                    <v-icon x-large>mdi-heart</v-icon>
                                </template>
                                <template v-else>
                                    <v-icon x-large>mdi-ring</v-icon>
                                </template>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </div>

        <div class="dashboard_item">
            <v-container>
                <h3>Contract Info</h3>
                <v-row>
                    <v-col cols="12" lg="6">
                        <v-card>
                            <v-card-title>
                                <v-container>
                                    <v-row>
                                        <v-col>
                                            Contract Address
                                        </v-col>
                                        <v-col>
                                            <eth-address-link class="text-right ml-2" :address="SmartWeddingContract.address"/>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-title>
                            <v-card-text>
                                <v-container>
                                    <v-row justify="space-between">
                                        <v-col>
                                            {{ SmartWeddingContract.address }}
                                        </v-col>
                                        <v-col class="text-right">
                                            <v-chip color="primary">Balance: {{ contractBalance }} ETH</v-chip>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </div>

        <div class="dashboard_item">
            <v-container>
                <h3>Address Book</h3>
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
            <v-container>
                <h3>ERC20 Tokens</h3>
                <v-row>
                    <v-col cols="12" lg="6">
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
                                                color="indigo"
                                                class="lighten-3"
                                                @click="addERCToken(inviteTokenAddress, 'INVITE')"
                                            ><v-icon>mdi-ethereum</v-icon></v-btn>
                                            <div>Invite</div>
                                        </v-col>
                                        <v-col cols="6" class="text-center">
                                            <v-btn
                                                fab
                                                x-large
                                                color="light-blue"
                                                class="lighten-4"
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
            <v-container>
                <h3>Written Contract</h3>
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
                contract: "GuestBook",
                method: "getInvitationTokenAddress"
            });
        },
        witnessTokenAddress() {
            return this.getContractData({
                contract: "GuestBook",
                method: "getWitnessTokenAddress"
            });
        },
        writtenContractIpfsHash() {
            return this.getContractData({
                contract: "SmartWeddingContract",
                method: "writtenContractIpfsHash"
            });
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