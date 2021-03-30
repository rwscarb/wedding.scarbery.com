<template>
    <div class="dashboard_view">

        <div class="dashboard_item">
            <v-container>
                <v-row justify-lg="start" class="flex-lg-row">
                    <v-col sm="12" lg="4">
                        <h3>Marriage Status</h3>
                        <v-card class="text-center">
                            <v-card-title class="justify-center">
                                <template v-if="contractDivorced">
                                    Divorced
                                </template>
                                <template v-else-if="contractSigned">
                                    Married
                                </template>
                                <template v-else>
                                    Engaged
                                </template>
                            </v-card-title>
                            <v-card-text>
                                <template v-if="contractDivorced">
                                    <v-icon x-large>mdi-heart-broken</v-icon>
                                </template>
                                <template v-else-if="contractSigned">
                                    <v-icon x-large>mdi-heart</v-icon>
                                </template>
                                <template v-else>
                                    <v-btn icon @click="playVideo = true"><v-icon x-large>mdi-ring</v-icon></v-btn>
                                </template>
                                <v-img src="@/assets/images/spouses.jpg" class="ma-2"/>
                            </v-card-text>
                            <v-card-actions class="justify-center pb-6">
                                <you-tube v-if="playVideo" video-id="_bY0fdgpISc" max-width="800"/>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                    <v-col cols="12" lg="5" xl="4" class="align-content-space-between d-flex flex-column">
                        <h3>Contract Info</h3>
                        <v-card>
                            <v-card-title class="justify-space-between">
                                <div>Contract Address</div>
                                <eth-address-link
                                    class="text-right ml-2"
                                    :address="SmartWeddingContract.address"/>
                            </v-card-title>
                            <v-card-text>
                                {{ SmartWeddingContract.address }}
                            </v-card-text>
                            <v-card-actions class="justify-end">
                                <v-chip color="primary" class="mb-2">
                                    Balance: {{ contractBalance }} ETH
                                </v-chip>
                            </v-card-actions>
                        </v-card>
                        <div v-for="(item, i) in addressBook" :key="i">
                            <h3>Address Book</h3>
                            <v-card>
                                <v-card-title class="justify-space-between">
                                    <div>{{ item.title }}</div>
                                    <eth-address-link :address="item.address"/>
                                </v-card-title>
                                <v-card-text>
                                    {{ item.address }}
                                </v-card-text>
                            </v-card>
                        </div>
                    </v-col>
                    <v-col cols="12" lg="3" class="align-lg-end">
                        <h3>ERC20 Tokens</h3>
                        <v-card :disabled="!hasWeb3Extension">
                            <v-card-title>Add Tokens to MetaMask</v-card-title>
                            <v-card-subtitle>Click to add tokens to MetaMask</v-card-subtitle>
                            <v-card-text class="d-flex justify-space-around">
                                <div>
                                    <v-btn
                                        fab
                                        x-large
                                        color="indigo"
                                        class="lighten-3"
                                        @click="addERCToken(inviteTokenAddress, 'INVITE')"
                                        ><v-icon>mdi-ethereum</v-icon></v-btn>
                                    <div class="text-center">Invite</div>
                                </div>
                                <div>
                                    <v-btn
                                        fab
                                        x-large
                                        color="light-blue"
                                        class="lighten-4"
                                        @click="addERCToken(witnessTokenAddress, 'WED')"
                                        ><v-icon>mdi-ethereum</v-icon></v-btn>
                                    <div class="text-center">Witness</div>
                                </div>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col v-if="writtenContractIpfsHash">
                        <h3>Written Contract</h3>
                        <v-card class="d-flex justify-center align-center">
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
import YouTube from '@/components/YouTube.vue';

export default {
    name: 'DashboardView',
    mixins: [DrizzleViewMixin],
    data: (() => {
        return {
            playVideo: false
        }
    }),
    computed: {
        addressBook() {
            return [
                {title: `${this.config.spouse1.firstName}'s Address`, address: this.spouse1Address},
                {title: `${this.config.spouse2.firstName}'s Address`, address: this.spouse2Address},
            ];
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
        ...mapGetters('contracts', [
            'getContractData'
        ]),
        ...mapGetters('settings', [
            'config'
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
        EthAddressLink,
        YouTube
    }
}
</script>

<style lang="less" scoped>
.v-card {
    min-height: 10em;
    .v-card__title {
        white-space: nowrap;
    }
}
</style>