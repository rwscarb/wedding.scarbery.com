import _ from "lodash";

import Vue from "vue";

import drizzleVuePlugin from "@drizzle/vue-plugin";

import SmartWeddingContract from "@/contracts/SmartWeddingContract.json";
import GuestBook from "@/contracts/GuestBook.json";
import config from "@/../config.js";
import store from "@/store";


const drizzleOptions = {
  web3: {
    block: false,
    fallback: {
      type: "ws",
      url: `wss://ropsten.infura.io/ws/v3/${config.infuraProjectId}`
    }
  },
  contracts: [SmartWeddingContract, GuestBook],
  events: {
    SmartWeddingContract: _.map([
      'AssetAddApproved',
      'AssetAdded',
      'AssetProposed',
      'AssetRemoveApproved',
      'AssetRemoved',
      'ContractSigned',
      'DivorceApproved',
      'Divorced',
      'FundsReceived',
      'FundsSent',
      'Signed',
      'WrittenContractProposed'
    ], x => {
      return {
        eventName: x,
        eventOptions: { fromBlock: 0 }
      }
    })
  },
  polls: {
    // check accounts ever 15 seconds
    accounts: 15000
  }
};

Vue.use(drizzleVuePlugin, {store, drizzleOptions});