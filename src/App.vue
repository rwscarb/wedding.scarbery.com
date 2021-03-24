<template>
    <v-app>
        <v-navigation-drawer v-model="drawer" app>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="title">
                        Crypto Wedding
                    </v-list-item-title>
                    <v-list-item-subtitle>Written in the time of COVID19</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-list nav>
                <v-list-item v-for="item in items" :key="item.title" link :to="item.route">
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        </v-app-bar>

        <v-main>
            <v-container fluid>
                <router-view></router-view>
            </v-container>
        </v-main>

        <v-footer app>
        </v-footer>
    </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import _ from 'lodash';

export default {
    name: 'App',
    data: () => ({
        drawer: false,
        events: [],
        items: [
            {title: 'Dashboard', icon: 'mdi-view-dashboard', route: '/'},
            {title: 'Guest Book', icon: 'mdi-message-text-lock-outline', route: '/guest-book'},
            {title: 'Photos', icon: 'mdi-image', route: '/photos'},
            {title: 'About', icon: 'mdi-help-box', route: '/about'},
        ]
    }),
    computed: {
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
            return this.drizzleInstance.contracts.SmartWeddingContract.address;
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
        contractSigned(newVal) {
            if (newVal) {
                this.$confetti.start();
                setTimeout(() => {
                    this.$confetti.stop();
                }, 5 * 1000);
            }
        }
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
        openInEtherScan(address) {
            window.open('https://ropsten.etherscan.io/address/' + address, '_blank');
        },
        addEvent(event) {
            this.events.push(event);
        },
    },
    created() {
        [{
            contractName: "SmartWeddingContract",
            method: "spouse1Address",
            methodArgs: []
        }, {
            contractName: "SmartWeddingContract",
            method: "spouse2Address",
            methodArgs: []
        }, {
            contractName: "SmartWeddingContract",
            method: "signed",
            methodArgs: []
        }, {
            contractName: "SmartWeddingContract",
            method: "divorced",
            methodArgs: []
        }, {
            contractName: "SmartWeddingContract",
            method: "getBalance",
            methodArgs: []
        }, {
            contractName: "SmartWeddingContract",
            method: "getInvitationTokenAddress",
            methodArgs: []
        }, {
            contractName: "SmartWeddingContract",
            method: "getWitnessTokenAddress",
            methodArgs: []
        }, {
            contractName: "SmartWeddingContract",
            method: "writtenContractIpfsHash",
            methodArgs: []
        }, {
            contractName: "SmartWeddingContract",
            method: "getGuestBookEntries",
            methodArgs: []
        }, {
            contractName: "SmartWeddingContract",
            method: "getAssetIds",
            methodArgs: []
        }].map(x => this.$store.dispatch("drizzle/REGISTER_CONTRACT", x));
    },
    mounted() {
        this.$drizzleEvents.$on('drizzle/contractEvent', this.addEvent);
    }
}
</script>
