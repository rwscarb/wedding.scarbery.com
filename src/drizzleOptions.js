import _ from 'lodash';

import SmartWeddingContract from "@/contracts/SmartWeddingContract.json";
import GuestBook from "@/contracts/GuestBook.json";
import config from "../config.js";

const options = {
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
      // 'GuestAttended',
      // 'GuestbookSignatureAdded',
      // 'GuestInvited',
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

export default options;
