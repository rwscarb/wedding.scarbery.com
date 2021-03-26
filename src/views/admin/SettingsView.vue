<template>
    <div class="settings_view">

        <h3>Settings</h3>

        <p>The key is used to decrypt asset data. It is stored in persistent browser storage.</p>

        <v-form
            ref="set_encryption_key_form"
            v-model="forms.encryption_key.valid"
            @submit.prevent="setEncryptionKey(forms.encryption_key.key)"
            >
            <v-text-field type="password" label="Set Encryption Key"
                v-model="forms.encryption_key.key"
                :rules="[v => v && v.length > 10 || 'Encryption key too weak']"
                >
                <template slot="append">
                    <v-btn type="submit" class="mb-2"
                        small
                        :loading="forms.encryption_key.loading"
                        :disabled="!forms.encryption_key.valid"
                        >Set</v-btn>
                </template>
            </v-text-field>
            <div class="text-center">
                <v-btn @click="removeEncryptionKey" :disabled="!encryptionKey">Remove Encryption Key</v-btn>
            </div>
        </v-form>
    </div>
</template>

<script>
import { DrizzleViewMixin } from '@/mixins/drizzleMixins.js';
import { SnackbarViewMixin } from '@/mixins/vuetifyMixins.js';

export default {
    name: 'SettingsView',
    mixins: [DrizzleViewMixin, SnackbarViewMixin],
    data: (() => {
        return {
            encryptionKey: '',
            forms: {
                encryption_key: {
                    valid: false,
                    loading: false,
                    key: ''
                }
            }
        }
    }),
    methods: {
        removeEncryptionKey() {
            try {
                localStorage.removeItem('encryption-key');
                this.encryptionKey = '';
                this.sendSnackbarMessage({message: 'Encryption Key Removed!'});
            } catch {
                this.sendSnackbarMessage({message: 'Error while attempting to remove encryption key'});
            }
        },
        setEncryptionKey(value) {
            try {
                localStorage.setItem('encryption-key', value);
                this.encryptionKey = value;
                this.$refs.set_encryption_key_form.reset();
                this.sendSnackbarMessage({message: 'Encryption Key Set!'});
            } catch {
                this.sendSnackbarMessage({message: 'Error while attempting to use local storage'});
            }
        },
    },
    mounted() {
        this.encryptionKey = localStorage.getItem('encryption-key');
    }
}
</script>

<style scoped>

</style>