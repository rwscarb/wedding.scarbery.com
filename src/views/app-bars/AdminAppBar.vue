<template>
    <v-app-bar app>
        <v-app-bar-nav-icon @click.stop="toggleShowNavigationDrawer"></v-app-bar-nav-icon>
        <template v-slot:extension>
            <v-tabs align-with-title>
                <v-tab to="/admin/invite">Invite</v-tab>
                <v-tab to="/admin/contract">Contract</v-tab>
                <v-tab to="/admin/assets">Assets</v-tab>
                <v-tab to="/admin/actions">Actions</v-tab>
            </v-tabs>
        </template>
    </v-app-bar>
</template>

<script>
import Vue from 'vue';

import _ from 'lodash';
import CryptoJS from 'crypto-js';

export default {
    methods: {
        async fetchAssets() {
            const assetIds = await this.SmartWeddingContract.methods.getAssetIds().call();
            const assets = await Promise.all(_.map(assetIds, async x => {
                const asset = await this.SmartWeddingContract.methods.assets(x - 1).call();
                asset.id = this.utils.toBN(x).toNumber();
                return asset;
            }));
            _.forEach(assets, x => {
                try {
                    x.decrypted = CryptoJS.AES.decrypt(x.data, this.encryptionKey).toString(CryptoJS.enc.Utf8);
                } catch {
                    x.decrypted = '**ENCRYPTED**';
                }
            });
            Vue.set(this, 'assets', assets);
        },
        async approveAsset(asset) {
            this.forms.asset.loading_table_action = true;
            try {
                await this.SmartWeddingContract.methods.approveAsset(asset.id).send();
            } catch (e) {
                this.sendSnackbarMessage(e);
            } finally {
                this.forms.asset.loading_table_action = false;
                this.forms.asset.loading = false;
            }
        },
        async removeAsset(asset) {
            this.forms.asset.loading_table_action = true;
            try {
                await this.SmartWeddingContract.methods.removeAsset(asset.id).send();
            } catch (e) {
                this.sendSnackbarMessage(e);
            } finally {
                this.forms.asset.loading_table_action = false;
                this.forms.asset.loading = false;
            }
        },
        filterAssets(row, filter) {
            return filter.removed ? true : !row.removed;
        },
        async setEncryptionKey(value) {
            try {
                localStorage.setItem('encryption-key', value);
                this.encryptionKey = value;
                this.snackbarMessage = 'Encryption key has been set';
            } catch {
                this.snackbarMessage = 'Error while attempting to use local storage';
            } finally {
                this.showSnackbar = true;
            }
            await this.fetchAssets();
        },
    },
}
</script>

<style lang="less" scoped>
</style>