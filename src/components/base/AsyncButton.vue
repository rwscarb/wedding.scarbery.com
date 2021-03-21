<template>
    <b-button v-bind="$attrs" v-on="$listeners" :disabled="loading">
        <b-spinner small class="spinner" v-if="loading"></b-spinner><slot></slot>
    </b-button>
</template>

<script>
export default {
  name: 'AsyncButton',
  props: {
    loading: Boolean
  }
}
</script>

<style lang="less" scoped>
.spinner {
    margin-right: .5em;
}
.btn {
    min-width: 7em;
}
</style>
