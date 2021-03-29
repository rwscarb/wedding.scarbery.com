<template>
    <div class="guestbook_view">
        <v-container>
            <h1>Guest Book</h1>

            <v-divider/>

            <h3>Sign the Guest Book</h3>

            <v-subheader>Submission can take up to 15 seconds as miners confirm the next block.</v-subheader>

            <v-form ref="guest_book_form"
                class="col-lg-6"
                v-model="forms.guest_book.valid"
                :disabled="!hasWeb3Extension"
                @submit.prevent="signGuestBook(forms.guest_book.name, forms.guest_book.message)">
                <v-text-field
                    v-model="forms.guest_book.name"
                    label="Name"
                    autocomplete="off"
                    :rules="[v => !!v || 'You forgot your name']"
                    :loading="forms.guest_book.loading"
                    required
                />
                <v-textarea
                    @keyup.ctrl.enter="signGuestBook(forms.guest_book.name, forms.guest_book.message)"
                    v-model="forms.guest_book.message"
                    label="Message"
                    name="guest_book_message"
                    :rules="[v => !!v || 'You forgot the message']"
                    :loading="forms.guest_book.loading"
                    solo
                />
                <v-btn type="submit" v-if="forms.guest_book.valid"
                    :loading="forms.guest_book.loading"
                    fab dark large icon>
                    <v-icon dense>mdi-email-edit-outline</v-icon>
                </v-btn>
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
        </v-container>
    </div>
</template>

<script>
import _ from 'lodash';

import Blocky from '@/components/Blocky.vue'
import { DrizzleViewMixin } from '@/mixins/drizzleMixins.js';
import { SnackbarViewMixin } from '@/mixins/vuetifyMixins.js';

export default {
    name: 'Guestbook',
    mixins: [DrizzleViewMixin, SnackbarViewMixin],
    data: (() => {
        return {
            forms: {
                guest_book: {
                    loading: false,
                    valid: false,
                    error: false,
                    name: '',
                    message: '',
                    errorMessage: '',
                }
            }
        }
    }),
    computed: {
        guestBookEntries() {
            let data = this.getContractDataWithDefault({
                contract: "GuestBook",
                method: "getGuestBookEntries",
                return_default: [],
            });
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
    },
    methods: {
        async signGuestBook(name, message) {
            this.forms.guest_book.loading = true;
            try {
                await this.GuestBook.methods.signGuestBook(
                    this.utils.utf8ToHex(name),
                    this.utils.utf8ToHex(message)
                ).send();
                this.$refs.guest_book_form.reset();
            } catch (e) {
                this.sendSnackbarMessage({message: e.message});
            } finally {
                this.forms.guest_book.loading = false;
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