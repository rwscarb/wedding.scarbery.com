<template>
    <v-app v-if="isDrizzleInitialized">

        <v-system-bar v-if="!hasWeb3Extension"
            class="white--text justify-center"
            color="red"
            height="50"
            app
            >
            <v-icon color="white">mdi-exclamation-thick</v-icon>
            <div class="text-center">
                You must install
                <a href="https://metamask.io/download.html" target="_blank" style="color:white">MetaMask</a>
                or a compatible extension to interact with this Smart Contract
            </div>
        </v-system-bar>

        <v-navigation-drawer v-model="navigationDrawerProxy" bottom app>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="nav_drawer_title">
                        <v-icon>mdi-shield-lock</v-icon>
                        {{ spouseDisplayNames }}
                    </v-list-item-title>
                    <v-list-item-subtitle class="mt-1">
                        Written in the time of COVID19
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-list nav>
                <v-list-item link to="/admin" v-if="isSpouse">
                    <v-list-item-icon>
                        <v-icon>mdi-badge-account-horizontal-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title class="nav_item_title">Admin</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item v-for="item in items" :key="item.title" link :to="item.route">
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title class="nav_item_title">{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <router-view name="appBar"></router-view>

        <v-main>
            <v-container fluid>
                <v-fade-transition hide-on-leave>
                    <router-view></router-view>
                </v-fade-transition>
            </v-container>
        </v-main>

        <v-snackbar :value="showSnackbar" :timeout="3000">
            <div class="text-center">{{ snackbarMessage }}</div>
        </v-snackbar>

        <v-footer padless app class="d-none d-lg-block">
            <v-card class="text-center" width="100%">
                <v-card-text>
                    <v-btn class="mx-4" icon href="https://twitter.com/ryan_scarbery" target="_blank">
                        <v-icon size="24px">mdi-twitter</v-icon>
                    </v-btn>
                    <v-btn class="mx-4" icon href="https://www.linkedin.com/in/ryan-scarbery/" target="_blank">
                        <v-icon size="24px">mdi-linkedin</v-icon>
                    </v-btn>
                    <v-btn class="mx-4" icon href="https://www.instagram.com/ryanscarbery/" target="_blank">
                        <v-icon size="24px">mdi-instagram</v-icon>
                    </v-btn>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-text>
                    &copy; {{ new Date().getFullYear() }} — Ryan Scarbery
                </v-card-text>
            </v-card>
        </v-footer>
    </v-app>
</template>

<script>
import _ from 'lodash';

import { mapGetters, mapActions } from 'vuex';

import { DrizzleViewMixin } from '@/mixins/drizzleMixins.js';

export default {
    name: 'App',
    mixins: [DrizzleViewMixin],
    data: () => ({
        events: [],
        items: [
            {title: 'Dashboard', icon: 'mdi-view-dashboard', route: '/dashboard'},
            {title: 'Guest Book', icon: 'mdi-message-text-lock-outline', route: '/guest-book'},
            {title: 'Photos', icon: 'mdi-image', route: '/photos'},
            {title: 'About', icon: 'mdi-help-circle-outline', route: '/about'},
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
        spouseDisplayNames() {
            return _.join(_.shuffle([this.config.spouse1.firstName, this.config.spouse2.firstName]), ' & ');
        },
        ...mapGetters('vuetify', [
            'showSnackbar',
            'snackbarMessage',
            'showNavigationDrawer',
        ]),
        ...mapGetters("drizzle", [
            "isDrizzleInitialized"
        ]),
        ...mapGetters('settings', [
            'config'
        ]),
    },
    watch: {
        contractSigned(newVal, oldVal) {
            if (newVal && newVal !== oldVal) {
                this.$confetti.start();
                setTimeout(() => {
                    this.$confetti.stop();
                }, 5 * 1000);
            }
        },
        contractDivorced(newVal, oldVal) {
            if (newVal && newVal !== oldVal) {
                this.$confetti.stop();
                this.$confetti.start({
                    particles: [
                        {type: 'heart'},
                        {type: 'circle'},
                    ],
                    defaultColors: [
                        'black',
                        'grey',
                        '#ba0000'
                    ],
                });
                setTimeout(() => {
                    this.$confetti.stop();
                }, 5 * 1000);
            }
        },
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
            method: "writtenContractIpfsHash",
            methodArgs: []
        }, {
            contractName: "SmartWeddingContract",
            method: "getAssetIds",
            methodArgs: []
        }, {
            contractName: "GuestBook",
            method: "getInvitationTokenAddress",
            methodArgs: []
        }, {
            contractName: "GuestBook",
            method: "getWitnessTokenAddress",
            methodArgs: []
        }, {
            contractName: "GuestBook",
            method: "getGuestBookEntries",
            methodArgs: []
        }].map(x => this.$store.dispatch("drizzle/REGISTER_CONTRACT", x));
    },
    mounted() {
        this.$drizzleEvents.$on('drizzle/contractEvent', this.addEvent);
        this.navigationDrawerProxy = this.$vuetify.breakpoint.lgAndUp;
    }
}
</script>

<style lang="less">
h1 {
    font-family: 'Parisienne', cursive;
    font-size: 2.5em;
    font-weight: normal;
}
h3 {
    margin-top: 2em;
}
form.v-form {
    padding-left: 0;
}
input[type=number] {
    text-align: center;
}
.v-card__title {
    white-space: normal;
    word-break: break-word;
}
.v-list-item__title.nav_item_title {
    font-family: 'Parisienne', cursive;
    font-size: 1.2em;
    padding-left: .1em;
}
.v-list-item__title.nav_drawer_title {
    font-family: 'Parisienne', cursive;
    font-size: 1.6em;
    overflow: visible;
}
</style>
