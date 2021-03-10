<template>
    <b-container>
        <b-row>
            <b-col>
                <b-form @submit.prevent="signGuestBook(forms.guest_book.name)"
                    autocomplete="off"
                    class="form_sign_guest_book">
                    <b-form-group
                        id="guest_book_form"
                        label="Sign Guest Book:"
                        label-for="guest_book_name">
                        <b-input-group>
                            <b-form-input
                                id="guest_book_name"
                                v-model="forms.guest_book.name"
                                type="text"
                                required
                                autofocus
                            ></b-form-input>
                            <b-input-group-append>
                                <b-button type="submit" variant="outline-secondary">Sign</b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-form-group>
                </b-form>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <h3>Entries:</h3>
                <b-list-group>
                    <b-list-group-item v-for="(entry, i) in guestBookEntries" :key="i">
                        {{ entry }}
                    </b-list-group-item>
                </b-list-group>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import _ from 'lodash';
import { mapGetters } from 'vuex';

export default {
    data: function () {
        return {
            forms: {
                guest_book: {
                    name: ''
                }
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
            return data.length ? _.map(data, this.utils.toUtf8) : ['There have been no guest entries.'];
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
        async signGuestBook(name) {
            await this.drizzleInstance.contracts.SmartWeddingContract.methods.signGuestBook(this.utils.utf8ToHex(name)).send();
            this.forms.guest_book.name = '';
        },
    }
}
</script>