<template>
    <b-container>
        <b-row>
            <b-col>
                <b-form @submit.prevent="signGuestBook(forms.guest_book.name, forms.guest_book.message)"
                    autocomplete="off"
                    class="form_sign_guest_book">
                    <b-form-group
                        label="Sign Guest Book:"
                        label-for="guest_book_name">
                        <b-form-input
                            id="guest_book_name"
                            v-model="forms.guest_book.name"
                            :disabled="forms.guest_book.loading"
                            type="text"
                            placeholder="name"
                            required
                            autofocus></b-form-input>
                    </b-form-group>
                    <b-form-group>
                        <b-form-textarea
                            id="guest_book_message"
                            v-model="forms.guest_book.message"
                            :disabled="forms.guest_book.loading"
                            placeholder="message"
                            rows="4"
                            required></b-form-textarea>
                    </b-form-group>
                    <async-button :loading="forms.guest_book.loading"
                        type="submit" variant="outline-secondary">Sign</async-button>
                    <b-form-invalid-feedback force-show v-if="forms.guest_book.errorMessage">
                        {{ forms.guest_book.errorMessage }}
                    </b-form-invalid-feedback>
                </b-form>
            </b-col>
        </b-row>
        <b-row>
            <b-col class="entries_list">
                <h3>Entries</h3>
                <b-list-group>
                    <b-list-group-item v-for="({name, message}, i) in guestBookEntries" :key="i">
                        <div v-if="name">
                            <div class="guest_book_name">{{ name }}</div>
                            <div class="guest_book_entry"><i>{{ message }}</i></div>
                        </div>
                        <div v-else>
                            {{ message }}
                        </div>
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
                    name: '',
                    loading: false,
                    errorMessage: ''
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
            if (data.length) {
                return _.map(data, x => {
                    return {
                        name: this.utils.toUtf8(x[0]),
                        message: this.utils.toUtf8(x[1])
                    };
                });
            } else {
                return [{message: 'There have been no guest entries.'}];
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
            this.forms.guest_book.errorMessage = null;
            this.forms.guest_book.loading = true;
            try {
                await this.drizzleInstance.contracts.SmartWeddingContract.methods.signGuestBook(
                    this.utils.utf8ToHex(name),
                    this.utils.utf8ToHex(message)
                ).send();
            } catch(e) {
                this.forms.guest_book.errorMessage = e.message;
            } finally {
                this.forms.guest_book.loading = false;
                this.forms.guest_book.name = '';
                this.forms.guest_book.message = '';
            }
        },
    }
}
</script>

<style lang="less" scoped>
@font-face {
    font-family: 'Cedarville Cursive';
    src: url(../assets/fonts/CedarvilleCursive-Regular.ttf);
}

.entries_list {
    margin-top: 1em;
    .guest_book_entry, .guest_book_name {
        font-family: 'Cedarville Cursive', cursive;
    }
    .guest_book_entry {
        text-align: center;
        margin: 1em 0;
        font-size: 1.5em;
    }
    .guest_book_name {
        font-size: 1.2em;
    }
}
#guest_book_name {
    width: 20em;
}
</style>