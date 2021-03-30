module.exports = {
  spouse1: {
    address: '0xB747BC6b537Af5C8E9C3a4727Fe58ffAd7fDE8f2',
    firstName: 'Ryan',
    lastName: 'Scarbery'
  },
  spouse2: {
    address: '0x87BEf8A37eFcec39d2bC44Bc2F4Cdd830d9d8CE9',
    firstName: 'Traci',
    lastName: 'Johan'
  },
  infuraProjectId: '5b0b1d1df587462ea847296efa599b6f',
  networks: {
    ropsten: {
      mnemonic: process.env.PRIVATE_MNEMONIC || ''
    }
  },
  site: {
    title: 'Smart Wedding Contract',
    baseURL: 'https://wedding.scarbery.com'
  },
  sentry: {
    org: 'ryan-scarbery',
    project: 'wedding-smart-contract'
  }
}