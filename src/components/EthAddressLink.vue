<template>
    <div class="eth_address_btn">
        <v-btn :href="href" target="_blank" fab x-small>
            <v-img class="ml-1" max-width="15" src="../assets/images/etherscan.png"></v-img>
        </v-btn>
    </div>
</template>

<script>
export default {
    name: 'EthAddressLink',
    props: {
        network: {
            type: String,
            default: 'ropsten'
        },
        address: String
    },
    computed: {
        href() {
            return `https://${this.network}.etherscan.io/search?q=${this.address}`
        }
    }
}
</script>