<template>
    <canvas></canvas>
</template>

<script>
import Blockies from 'ethereum-blockies';

export default {
    name: 'Blocky',
    props: {
        size: Number,
        seed: String
    },
    watch: {
        size: 'render',
        seed: 'render',
    },
    methods: {
        render() {
            Blockies.render({size: this.size, seed: this.seed, color: '#c73131', bgcolor: '#aaa'}, this.$el);
        }
    },
    mounted() {
        this.render();
    }
}
</script>

<style scoped>

</style>