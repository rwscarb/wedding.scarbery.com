import { mapGetters } from 'vuex';

export const DrizzleViewMixin = {
  computed: {
    utils() {
      return this.drizzleInstance.web3.utils;
    },
    SmartWeddingContract() {
      return this.drizzleInstance.contracts.SmartWeddingContract;
    },
    GuestBook() {
      return this.drizzleInstance.contracts.GuestBook;
    },
    getContractDataWithDefault() {
      return function ({contract, method, return_default}) {
        const data = this.getContractData({
          contract: contract,
          method: method
        });
        return data === "loading" ? return_default : data;
      }
    },
    ...mapGetters('contracts', [
      'getContractData',
    ]),
    ...mapGetters('drizzle', [
      'drizzleInstance',
    ]),
  },
}