<template>
    <div class="invite_view">
        <v-container>
            <h3>Invite Ethereum Address</h3>

            <p>
                Invited guests will receive an Invitation Token now and a Wedding Token at time of contract signature.
            </p>
            <p>
                They will also be able to sign the <router-link to="/guest-book">Guest Book</router-link>.
            </p>

            <v-form
                v-model="forms.invitation.valid"
                @submit.prevent="inviteAddress(forms.invitation.address)"
                ref="invite_form"
            >
                <v-text-field
                    v-model="forms.invitation.address"
                    :loading="forms.invitation.loading"
                    :rules="[v => utils.isAddress(v) || 'Must be a valid Ethereum address']"
                    label="Invite Address"
                    autocomplete="off"
                    placeholder="0x"
                    required
                ></v-text-field>
                <v-btn type="submit" :loading="forms.invitation.loading" :disabled="!forms.invitation.valid" @click="giveMeSourceMapsSentry">Invite</v-btn>
            </v-form>
        </v-container>
    </div>
</template>

<script>
import { DrizzleViewMixin } from '@/mixins/drizzleMixins.js';
import { SnackbarViewMixin } from '@/mixins/vuetifyMixins.js';

export default {
    name: 'InviteView',
    mixins: [DrizzleViewMixin, SnackbarViewMixin],
    data: (() => {
        return {
            forms: {
                invitation: {
                    valid: false,
                    loading: false,
                    address: ''
                }
            }
        };
    }),
    methods: {
        async inviteAddress(address) {
            this.forms.invitation.loading = true;
            try {
                await this.GuestBook.methods.sendInvitation(address).send();
                await this.sendSnackbarMessage({message: `Address: ${address} added!`});
            } catch (e) {
                this.sendSnackbarMessage({message: e.message});
            } finally {
                this.$refs.invite_form.reset();
                this.forms.invitation.loading = false;
            }
        },
    },
}
</script>

<style scoped>

</style>