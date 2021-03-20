<template>
    <b-container v-if="isDrizzleInitialized">
        <b-jumbotron header="Crypto Wedding">
        </b-jumbotron>
        <b-row>
            <b-col>
                <b-input-group size="sm" prepend="Spouse 1 Address">
                    <b-form-input :value="spouse1Address" class="address" readonly></b-form-input>
                </b-input-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-input-group size="sm" prepend="Spouse 2 Address">
                    <b-form-input :value="spouse2Address" class="address" readonly></b-form-input>
                </b-input-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-input-group size="sm" prepend="Invitation Token Address">
                    <b-form-input :value="invitationTokenAddress" class="address" readonly></b-form-input>
                    <b-input-group-append>
                        <b-button @click="addERCToken(invitationTokenAddress, 'INVITE')"
                            class="token_meta_mask_button"
                            variant="outline-secondary"
                            title="Click to add token to MetaMask">
                            <img src="@/assets/meta-mask.png">
                        </b-button>
                    </b-input-group-append>
                </b-input-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-input-group size="sm" prepend="Witness Token Address">
                    <b-form-input :value="witnessTokenAddress" class="address" readonly></b-form-input>
                    <b-input-group-append>
                        <b-button @click="addERCToken(witnessTokenAddress, 'WED')"
                            class="token_meta_mask_button"
                            variant="outline-secondary"
                            title="Click to add token to MetaMask">
                            <img src="@/assets/meta-mask.png">
                        </b-button>
                    </b-input-group-append>
                </b-input-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-input-group size="sm" class="contract_status">
                    <b-form-checkbox :checked="contractSigned" disabled>Signed</b-form-checkbox>
                    <b-form-checkbox :checked="contractDivorced" disabled>Divorced</b-form-checkbox>
                </b-input-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-card title="Card Title" no-body>
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
                <h3>Events:</h3>
                <b-list-group v-if="displayedEvents.length">
                    <b-list-group-item v-for="(event, i) in displayedEvents" :key="i">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">{{ event.eventName }}</h5>
                            <small>{{ new Date(Number(event.data.timestamp) * 1000).toLocaleString() }}</small>
                        </div>
                        <pre>{{ event.data }}</pre>
                    </b-list-group-item>
                </b-list-group>
                <i v-else>No events recorded...</i>
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
        logEvent(event) {
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
        this.$drizzleEvents.$on('drizzle/contractEvent', this.logEvent);
    }
}
</script>

<style lang="less" scoped>
h3 {
    margin-top: 1em;
}

.row {
    margin-bottom: .5em;
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

.contract_status .custom-checkbox {
    margin-right: 1em;
}

.input-group-sm > .input-group-append > .btn.token_meta_mask_button {
    padding: 0;
}
</style>
