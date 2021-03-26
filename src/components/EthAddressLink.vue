<template>
    <div class="eth_address_link">
        <v-btn :href="href" target="_blank" fab x-small>
            <v-img max-width="15" src="../assets/images/etherscan.png"></v-img>
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
            return `https://${this.network}.etherscan.io/address/${this.address}#code`
        }
    }
}
</script>