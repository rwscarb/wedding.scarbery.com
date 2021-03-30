<template>
    <div class="help_view">
        <v-container>
            <h1>Help</h1>

            <v-divider/>

            <h3>Getting started with Smart Contracts</h3>

            <v-stepper v-model="step" vertical>
                <v-stepper-step :complete="step > 1" step="1">
                    Install MetaMask
                </v-stepper-step>

                <v-stepper-content step="1">
                    <p>
                        MetaMask is a popular browser-based cryptocurrency wallet.
                        You can use it to interact with Ethereum
                        Smart Contracts such as this one.
                    </p>
                    <p>
                        Click <v-icon class="mr-1">mdi-hand-pointing-right</v-icon>
                        <a href="https://metamask.io/download.html" target="_blank">https://metamask.io/download.html</a>
                        to download.
                    </p>
                    <v-btn color="primary" @click="step = 2">Continue</v-btn>
                </v-stepper-content>

                <v-stepper-step :complete="step > 2" step="2">
                    Set up your Ethereum Wallet
                </v-stepper-step>

                <v-stepper-content step="2">
                    Create a new wallet when prompted.
                    <v-img src="@/assets/images/help/meta-mask-install.jpg" width="500"/>
                    <v-btn color="primary" @click="step = 3">Continue</v-btn>
                    <v-btn text @click="step = 1" class="ml-2">Back</v-btn>
                </v-stepper-content>

                <v-stepper-step :complete="step > 3" step="3">
                    Select Ropsten Ethereum Network
                </v-stepper-step>

                <v-stepper-content step="3" class="d-flex">
                    <div class="col-lg-6">
                        <p>
                            As you may know, Ethereum is a second generation cryptocurrency, building off of the tried and
                            tested principles of Bitcoin. It provides a
                            <a href="https://en.wikipedia.org/wiki/Turing_completeness" target="_blank">Turing Complete</a>
                            language for writing
                            <a href="https://en.wikipedia.org/wiki/Smart_contract" target="_blank">Smart Contracts</a> and
                            doubles as a currency. As of this writing, Ethereum is trading at over $1,600 USD per Ether.
                        </p>
                        <p>
                            To get around the costs, I have deployed the smart contract to a test network that is free to use.
                            In the <b>Networks</b> dropdown of MetaMask select the <b>Ropsten Test Network</b>.
                        </p>

                    </div>
                    <div class="col-lg-6">
                        <v-hover v-slot="{ hover }">
                            <v-card :elevation="hover ? 6 : 2">
                                <v-card-title>
                                    <v-img src="@/assets/images/help/meta-mask-network-selection-2.jpg"
                                        min-width="200"
                                        @click="dialog2 = true"/>
                                </v-card-title>
                            </v-card>
                        </v-hover>
                        <v-dialog v-model="dialog2">
                            <v-hover v-slot="{ hover }">
                                <v-card
                                    :elevation="hover ? 12 : 2"
                                    :class="{ 'on-hover': hover }"
                                    >
                                    <v-card-title class="image_modal_title justify-center">
                                        <div>Select "Ropsten Network" from the dropdown menu.</div>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-img src="@/assets/images/help/meta-mask-network-selection-2.jpg"/>
                                    </v-card-text>
                                    <v-card-actions class="justify-end">
                                        <v-btn class="mb-2" @click="dialog2 = false">Close</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-hover>
                        </v-dialog>
                    </div>
                    <v-btn color="primary" @click="step = 4">Continue</v-btn>
                    <v-btn text @click="step = 2" class="ml-2">Back</v-btn>
                </v-stepper-content>

                <v-stepper-step :complete="step > 4" step="4">
                    Send me your wallet address so I can invite you to the wedding
                </v-stepper-step>

                <v-stepper-content step="4">
                    <p>
                        You can copy your primary wallet address to the clipboard by clicking here.
                    </p>
                    <v-hover v-slot="{ hover }">
                        <v-card :elevation="hover ? 6 : 2" class="col-lg-6">
                            <v-img src="@/assets/images/help/meta-mask-copy-address.jpg"
                                min-width="200"
                                max-width="500"
                                @click="dialog4 = true"/>
                        </v-card>
                    </v-hover>
                    <v-dialog v-model="dialog4">
                        <v-hover v-slot="{ hover }">
                            <v-card
                                :elevation="hover ? 12 : 2"
                                :class="{ 'on-hover': hover }">
                                <v-card-title>
                                    Click the <v-btn class="ma-3" small>Account 1</v-btn> button to copy your Ethereum
                                    address to your clipboard.
                                </v-card-title>
                                <v-card-text>
                                    <v-img src="@/assets/images/help/meta-mask-copy-address.jpg" min-width="200"/>
                                </v-card-text>
                                <v-card-actions class="justify-end">
                                    <v-btn class="mb-2" @click="dialog4 = false">Close</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-hover>
                    </v-dialog>
                    <div class="mt-3">
                        <v-btn color="primary" @click="step = 5">Continue</v-btn>
                        <v-btn text @click="step = 3" class="ml-2">Back</v-btn>
                    </div>
                </v-stepper-content>

                <v-stepper-step :complete="step > 5" step="5">
                    Get some Ethereum
                </v-stepper-step>

                <v-stepper-content step="5">
                    <v-container>
                        <v-row>
                            <v-col cols="12" md="8">
                                <p>
                                    To execute actions against the smart contract you will need some test Ethereum.
                                </p>
                                <p>
                                    Navigate to <a href="https://faucet.ropsten.be/" target="_blank">this site</a> to get some.
                                    Warning; you only get one shot per day.
                                </p>
                            </v-col>
                            <v-col md="2">
                                <div>Watch out for De-Fi Karen</div>
                                <img src="@/assets/images/help/de-fi-karen.jpg" height="100"/>
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-btn color="primary" @click="step = 6">Continue</v-btn>
                    <v-btn text @click="step = 4" class="ml-2">Back</v-btn>
                </v-stepper-content>

                <v-stepper-step :complete="step > 6" step="6">
                    Profit!
                </v-stepper-step>

                <v-stepper-content step="6" class="col-md-8">
                    <p>
                        Once I have received your address and invited you to the wedding, you can sign the
                        <router-link to="/guest-book">Guest Book</router-link>. You will also receive an ERC20
                        <a :href="`https://ropsten.etherscan.io/token/${inviteTokenAddress}`"
                            target="_blank">INVITE</a> token at the time of invitation, and another ERC20
                        <a :href="`https://ropsten.etherscan.io/token/${witnessTokenAddress}`"
                            target="_blank">WED</a> token at the time both spouses sign.
                    </p>
                </v-stepper-content>

            </v-stepper>

        </v-container>
    </div>
</template>

<script>
import { DrizzleViewMixin } from '@/mixins/drizzleMixins.js';

export default {
    name: 'HelpView',
    mixins: [DrizzleViewMixin],
    data: (() => {
        return {
            step: 1,
            dialog1: false,
            dialog2: false,
            dialog3: false,
            dialog4: false,
        }
    }),
    computed: {
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
    },
}
</script>

<style lang="less" scoped>
.v-dialog {
    width: unset;
}
.image_modal_title {
    margin-top: 2em;
    white-space: nowrap;
    font-size: 1em;
}
</style>