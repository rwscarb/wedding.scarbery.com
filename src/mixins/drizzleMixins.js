import _ from 'lodash';

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
    contractSigned() {
      return this.getContractDataWithDefault({
        contract: "SmartWeddingContract",
        method: "signed",
        return_default: false
      });
    },
    contractDivorced() {
      return this.getContractDataWithDefault({
        contract: "SmartWeddingContract",
        method: "divorced",
        return_default: false
      });
    },
    spouse1Address() {
      return this.getContractData({
        contract: "SmartWeddingContract",
        method: "spouse1Address"
      });
    },
    spouse2Address() {
      return this.getContractData({
        contract: "SmartWeddingContract",
        method: "spouse2Address"
      });
    },
    isSpouse() {
      return _.includes([this.spouse1Address, this.spouse2Address], this.activeAccount);
    },
    hasWeb3Extension() {
      return window.ethereum;
    },
    ...mapGetters('contracts', [
      'getContractData',
    ]),
    ...mapGetters('drizzle', [
      'drizzleInstance',
    ]),
    ...mapGetters('accounts', [
      'activeAccount'
    ]),
  },
}