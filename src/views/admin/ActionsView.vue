<template>
    <div class="actions_view">
        <h2>Contract Actions</h2>

        <p class="subtitle-1">
            Various actions a spouse can execute.
        </p>

        <v-container>
            <v-row justify-lg="center">
                <v-col xl="12">
                    <v-card>
                        <v-card-title>Send Ethereum from Contract</v-card-title>
                        <v-card-text>
                            <v-form
                                ref="pay_form"
                                @submit.prevent="pay(forms.pay.address, forms.pay.amount)"
                                v-model="forms.pay.valid"
                                >
                                <v-container>
                                    <v-row>
                                        <v-col cols="6">
                                            <v-text-field
                                                v-model="forms.pay.address"
                                                :loading="forms.pay.loading"
                                                :rules="[v => utils.isAddress(v) || 'Must be a valid Ethereum address']"
                                                label="address"
                                                placeholder="0x"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col style="min-width: 2rem">
                                            <v-text-field
                                                v-model="forms.pay.amount"
                                                :loading="forms.pay.loading"
                                                label="amount"
                                                type="number"
                                                required
                                            ></v-text-field>
                                        </v-col>
                                        <v-col>
                                            <v-btn
                                                type="submit"
                                                :loading="forms.pay.loading"
                                                >Send<v-icon x-small>mdi-ethereum</v-icon>
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12" xl="6" md="3" class="align-stretch">
                    <v-badge  v-if="contractSigned"
                        class="fill-column"
                        icon="mdi-clock-alert"
                        title="Waiting for other spouse to divorce"
                        :value="userDivorced && !contractDivorced"
                        bordered
                        overlap

                        >
                        <v-btn
                            class="fill-column"
                            @click="divorce"
                            :disabled="userDivorced"
                            :loading="forms.sign.loading"
                            >Divorce</v-btn>
                    </v-badge>

                    <v-badge v-else
                        class="fill-column"
                        icon="mdi-clock-alert"
                        title="Waiting for other spouse to sign"
                        :value="userSigned"
                        bordered
                        overlap
                        >
                        <v-btn
                            class="fill-column"
                            @click="signContract"
                            :disabled="userSigned"
                            :loading="forms.sign.loading"
                            >Sign Contract</v-btn>
                    </v-badge>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import { DrizzleViewMixin } from '@/mixins/drizzleMixins.js';
import { SnackbarViewMixin } from '@/mixins/vuetifyMixins.js';

export default {
    name: 'ActionsView',
    mixins: [DrizzleViewMixin, SnackbarViewMixin],
    data: (() => {
        return {
            forms: {
                pay: {
                    valid: false,
                    loading: false,
                    address: '',
                    amount: 0,
                },
                sign: {
                    loading: false
                }
            }
        }
    }),
    computed: {
        userSigned() {
            if (!this.isSpouse) return false;
            return this.getContractDataWithDefault({
                contract: 'SmartWeddingContract',
                method: 'senderSigned',
                return_default: false
            });
        },
        userDivorced() {
            if (!this.isSpouse) return false;
            return this.getContractDataWithDefault({
                contract: 'SmartWeddingContract',
                method: 'senderDivorced',
                return_default: false
            });
        },
    },
    methods: {
        async pay(address, amount) {
            this.forms.pay.loading = true;
            try {
                await this.SmartWeddingContract.methods.pay(address, this.utils.toWei(amount)).send();
            } catch (e) {
                this.sendSnackbarMessage({message: e.message});
            } finally {
                this.forms.pay.loading = false;
                this.$refs.pay_form.reset();
            }
        },
        async signContract() {
            this.forms.sign.loading = true;
            try {
                await this.SmartWeddingContract.methods.signContract().send();
            } catch (e) {
                this.sendSnackbarMessage({message: e.message});
            } finally {
                this.forms.sign.loading = false;
            }
        },
        async divorce() {
            this.forms.sign.loading = true;
            try {
                await this.SmartWeddingContract.methods.divorce().send();
            } catch (e) {
                this.sendSnackbarMessage({message: e.message});
            } finally {
                this.forms.sign.loading = false;
            }
        },
    },
}
</script>

<style scoped>
/* todo: there must be a better way */
.fill-column {
    width: 100% !important;
    height: 100% !important;
    min-height: 4em;
}
</style>