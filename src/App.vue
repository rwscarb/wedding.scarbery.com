<template>
    <b-container v-if="isDrizzleInitialized" fluid="sm">
        <div v-if="!drizzleInstance.web3.currentProvider.isMetaMask" id="header_danger">
            <b-link href="https://www.google.com?q=Meta+Mask" target="_blank">Metamask</b-link> is required to interact with contract
        </div>
        <b-jumbotron header="Crypto Wedding">
        </b-jumbotron>
        <b-row>
            <b-col lg="3" class="contract_status">
                <b-card title="Status" align="stretch">
                    <b-input-group size="sm">
                        <b-form-checkbox :checked="contractSigned" disabled>Signed</b-form-checkbox>
                        <b-form-checkbox :checked="contractDivorced" disabled>Divorced</b-form-checkbox>
                    </b-input-group>
                    <div class="status_balance">Balance: {{ contractBalance.toFixed(6) }} ETH</div>
                </b-card>
            </b-col>
            <b-col>
                <b-row>
                    <b-col>
                        <b-input-group size="sm" prepend="Contract Address">
                            <b-form-input :value="contractAddress" class="address text-monospace" readonly></b-form-input>
                            <b-input-group-append>
                                <b-button @click="openInEtherScan(contractAddress)"
                                    class="address_button"
                                    variant="outline-secondary"
                                    title="Click to view in Etherscan">
                                    <img src="@/assets/images/etherscan.png">
                                </b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-input-group size="sm" prepend="Spouse 1 Address">
                            <b-form-input :value="spouse1Address" class="address text-monospace" readonly></b-form-input>
                            <b-input-group-append>
                                <b-button @click="openInEtherScan(spouse1Address)"
                                    class="address_button"
                                    variant="outline-secondary"
                                    title="Click to view in Etherscan">
                                    <img src="@/assets/images/etherscan.png">
                                </b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-input-group size="sm" prepend="Spouse 2 Address">
                            <b-form-input :value="spouse2Address" class="address text-monospace" readonly></b-form-input>
                            <b-input-group-append>
                                <b-button @click="openInEtherScan(spouse2Address)"
                                    class="address_button"
                                    variant="outline-secondary"
                                    title="Click to view in Etherscan">
                                    <img src="@/assets/images/etherscan.png">
                                </b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-input-group size="sm" prepend="Invitation Token Address">
                            <b-form-input :value="invitationTokenAddress" class="address text-monospace" readonly></b-form-input>
                            <b-input-group-append>
                                <b-button @click="addERCToken(invitationTokenAddress, 'INVITE')"
                                    class="address_button"
                                    variant="outline-secondary"
                                    title="Click to add token to MetaMask">
                                    <img src="@/assets/images/meta-mask.png">
                                </b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-input-group size="sm" prepend="Witness Token Address">
                            <b-form-input :value="witnessTokenAddress" class="address text-monospace" readonly></b-form-input>
                            <b-input-group-append>
                                <b-button @click="addERCToken(witnessTokenAddress, 'WED')"
                                    class="address_button"
                                    variant="outline-secondary"
                                    title="Click to add token to MetaMask">
                                    <img src="@/assets/images/meta-mask.png">
                                </b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <h3 class="naked_title">Smart Contract</h3>
                <b-card no-body style="min-height: 20em">
                    <b-card-header header-tag="nav">
                        <b-nav card-header tabs>
                            <b-nav-item to="/guest-book" exact exact-active-class="active">Guest Book</b-nav-item>
                            <b-nav-item to="/admin" exact exact-active-class="active">Admin</b-nav-item>
                            <b-nav-item to="/about" exact exact-active-class="active">About</b-nav-item>
                        </b-nav>
                    </b-card-header>
                    <b-card-body>
                        <router-view></router-view>
                    </b-card-body>
                </b-card>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <h3 class="naked_title">Events</h3>
                <b-list-group v-if="displayedEvents.length">
                    <b-list-group-item v-for="(event, i) in displayedEvents" :key="i">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">{{ event.eventName }}</h5>
                            <small>{{ new Date(Number(event.data.timestamp) * 1000).toLocaleString() }}</small>
                        </div>
                        <pre>{{ event.data }}</pre>
                    </b-list-group-item>
                </b-list-group>
                <i v-else class="naked_title">No events recorded...</i>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import { mapGetters } from 'vuex';
import _ from 'lodash';

export default {
    data: function () {
        return {
            events: []
        }
    },
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
    methods: {
        async addERCToken(address, symbol) {
            await this.drizzleInstance.web3.currentProvider.sendAsync({
                method: 'metamask_watchAsset',
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

<style lang="less">
h3 {
    margin-top: 1em;
}

.row {
    margin-bottom: .5em;
}

#header_danger {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    margin-top: .55em;
    padding-top: .2em;
    background-color: red;
    height: 2em;
    color: white;
    font-style: italic;
    text-align: center;
    z-index: 42;
    a {
        color: white;
        font-weight: bold;
        text-decoration: underline;
    }
}

.address {
    text-align: right;

    &[readonly] {
        background-color: white;
    }
}

.input-group-text {
    width: 14em;
}

#guest_book_form {
    margin-top: 1em;
}

.contract_status {
    margin-bottom: 2em;
    .custom-checkbox {
        margin-right: 1em;
    }
}

.input-group-sm > .input-group-append > .btn.address_button {
    width: 2em;
    padding: 0;
    background-color: white;
}

body {
    background: url(./assets/images/background.jpg) no-repeat center center fixed;
    background-size: cover;
}

.naked_title {
    color: white;
}

h3.naked_title {
    margin-top: 1.2em;
}

.status_balance {
    margin-top: .25em;
    font-size: .8em;
}

@media (max-width: 767.98px) {
    .container-sm {
        padding: 0 !important;
    }
}
</style>
