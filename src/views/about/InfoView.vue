<template>
    <div class="info_view">
        <p>
            This website provides an interface to an
            <a href="https://en.wikipedia.org/wiki/Ethereum" target="_blank">Ethereum</a>
            &nbsp;<a href="https://en.wikipedia.org/wiki/Smart_contract" target="_blank">Smart Contract</a>
            that represents a marriage. Features includes an invite-only
            <router-link to="/guest-book">Guest Book</router-link>, asset management, and a joint spending account.
            Most actions will require both spouses to approve, such as signing, divorcing and managing assets.
        </p>
        <p>
            The contract itself can be used as a joint spending account with either spouse able to spend from its balance.
            In the case of divorce, all remaining balance will be distributed evenly back to the individual spouses.
        </p>
        <p>
            A prenuptial agreement can also be hosted on a decentralized file system and referenced in the contract
            before signing.
        </p>
        <p>
            With <a href="https://metamask.io/" target="_blank">MetaMask</a> or a compatible web3 client installed,
            an invited user can sign the Guest Book. They will receive an ERC20 token
            at the time of invitation and will receive another token at the time of contract signature.
        </p>
        <p>
            All pages on this site are reactive to the blockchain and will update as new blocks are mined without the
            need to refresh. It should be noted that form submissions can take up to 15 seconds to finish as the next
            Ethereum block must be mined for changes to be recorded.
        </p>
        <p>
            Source code can be found <a href="https://github.com/rwscarb/wedding.scarbery.com" target="_blank">here</a>.
        </p>
    </div>
</template>

<script>
export default {
    name: 'InfoView',
}
</script>