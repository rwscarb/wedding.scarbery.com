<template>
    <div class="guestbook_view">

        <h3>Sign the Guest Book</h3>
        <v-form ref="form"
            v-model="form.valid"
            @submit.prevent="signGuestBook(form.name, form.message)">
            <v-text-field
                v-model="form.name"
                label="Name"
                autocomplete="off"
                :rules="[v => !!v || 'You forgot your name']"
                :loading="form.loading"
                required
                />
            <v-textarea
                v-model="form.message"
                label="Message"
                name="guest_book_message"
                :rules="[v => !!v || 'You forgot the message']"
                :loading="form.loading"
                solo
                />
            <v-row>
                <v-col align="end">
                    <v-btn class="mx-2 align-right" fab dark large type="submit"
                        :disabled="!form.valid" :loading="form.loading">
                        <v-icon dense>mdi-email-edit-outline</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-form>

        <h3>Entries</h3>
        <v-list three-line>
            <v-list-item v-for="({name, address, message}, i) in guestBookEntries" :key="i">
                <v-list-item-avatar><blocky :seed="address" :size="10"></blocky></v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title v-if="name">{{ name }}</v-list-item-title>
                    <v-list-item-subtitle>{{ message }}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-list>

        <v-snackbar v-model="form.error" :timeout="3000">{{ form.errorMessage }}</v-snackbar>
    </div>
</template>

<script>
import _ from 'lodash';
import { mapGetters } from 'vuex';

import Blocky from '@/components/Blocky.vue'

export default {
    data: function () {
        return {
            form: {
                loading: false,
                valid: false,
                error: false,
                name: '',
                message: '',
                errorMessage: '',
            }
        }
    },
    computed: {
        guestBookEntries() {
            let data = this.getContractData({
                contract: "SmartWeddingContract",
                method: "getGuestBookEntries"
            });
            if (data === "loading") return [];
            if (data.length) {
                return _.reverse(_.map(data, x => {
                    return {
                        address: x[0],
                        name: this.utils.toUtf8(x[1]),
                        message: this.utils.toUtf8(x[2]),
                    };
                }));
            } else {
                return [{address: '0xFFFFF', name: 'Anonymous', message: 'There have been no guest entries.'}];
            }
        },
        ...mapGetters("drizzle", [
            "drizzleInstance",
            "isDrizzleInitialized"
        ]),
        ...mapGetters("contracts", [
            "getContractData"
        ]),
        utils() {
            return this.drizzleInstance.web3.utils;
        },
    },
    methods: {
        async signGuestBook(name, message) {
            this.form.loading = true;
            this.form.errorMessage = null;
            try {
                await this.drizzleInstance.contracts.SmartWeddingContract.methods.signGuestBook(
                    this.utils.utf8ToHex(name),
                    this.utils.utf8ToHex(message)
                ).send();
                this.$refs.form.reset();
            } catch (e) {
                this.form.error = true;
                this.form.errorMessage = e.message;
            } finally {
                this.form.loading = false;
            }
        },
    },
    components: {
        Blocky
    }
}
</script>

<style lang="less" scoped>
</style>