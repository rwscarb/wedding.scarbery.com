<template>
    <div class="dashboard_view">

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
                                        ><v-icon>mdi-ethereum</v-icon></v-btn>
                                        <div>Invite</div>
                                    </v-col>
                                    <v-col cols="6" class="text-center">
                                        <v-btn
                                            fab
                                            x-large
                                            color="blue"
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
                {title: 'Contract Address', address: this.contractAddress},
                {title: 'Spouse 1 Address', address: this.spouse1Address},
                {title: 'Spouse 2 Address', address: this.spouse2Address},
            ];
        },
        invitationTokenAddress() {
            return this.getContractData({
                contract: "SmartWeddingContract",
                method: "getInvitationTokenAddress",
            });
        },
        witnessTokenAddress() {
            return this.getContractData({
                contract: "SmartWeddingContract",
                method: "getWitnessTokenAddress",
            });
        },
        contractAddress() {
            return this.SmartWeddingContract.address;
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
        displayedEvents() {
            const sortedEvents = _.sortBy(_.uniqBy(this.events, x => x.data.timestamp), x => -_.toNumber(x.data.timestamp));
            _.forEach(sortedEvents, x => {
                x.data = _.pickBy(x.data, (v, k) => _.isNaN(_.toNumber(k))); // remove drizzle numeric props
            })
            return sortedEvents;
        },
        ...mapGetters("contracts", [
            "getContractData"
        ]),
    },
    components: {
        EthAddressLink
    }
}
</script>