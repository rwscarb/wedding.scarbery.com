<template>
    <v-app>
        <v-navigation-drawer v-model="navigationDrawerProxy" app>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="title">
                        Crypto Wedding
                    </v-list-item-title>
                    <v-list-item-subtitle>Written in the time of COVID19</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-list nav>
                <v-list-item v-for="item in items" :key="item.title" link :to="item.route">
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <router-view name="appBar"></router-view>

        <v-main>
            <v-container fluid v-if="isDrizzleInitialized">
                <router-view></router-view>
            </v-container>
        </v-main>

        <v-snackbar v-model="showSnackbar" :timeout="3000">{{ snackbarMessage }}</v-snackbar>

        <v-footer app>
        </v-footer>
    </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'App',
    data: () => ({
        events: [],
        items: [
            {title: 'Dashboard', icon: 'mdi-view-dashboard', route: '/dashboard'},
            {title: 'Guest Book', icon: 'mdi-message-text-lock-outline', route: '/guest-book'},
            {title: 'Photos', icon: 'mdi-image', route: '/photos'},
            {title: 'Admin', icon: 'mdi-badge-account-horizontal-outline', route: '/admin'},
            {title: 'About', icon: 'mdi-cupcake', route: '/about'},
        ]
    }),
    computed: {
        navigationDrawerProxy: {
            get() {
                return this.showNavigationDrawer;
            },
            set(show) {
                this.setShowNavigationDrawer({show});
            }
        },
        ...mapGetters('vuetify', [
            'showSnackbar',
            'snackbarMessage',
            'showNavigationDrawer',
        ]),
        ...mapGetters("drizzle", [
            "isDrizzleInitialized"
        ]),
    },
    watch: {
        contractSigned(newVal) {
            if (newVal) {
                this.$confetti.start();
                setTimeout(() => {
                    this.$confetti.stop();
                }, 5 * 1000);
            }
        }
    },
    methods: {
        ...mapActions('vuetify', [
            'setShowNavigationDrawer',
        ]),
        ...mapActions('events', [
            'addEvent',
        ]),
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
            method: "getBalance",
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
        this.$drizzleEvents.$on('drizzle/contractEvent', this.addEvent);
    }
}
</script>

<style lang="less">
#app {
    min-width: 432px;
}
h3 {
    margin-top: 2rem;
}
</style>
