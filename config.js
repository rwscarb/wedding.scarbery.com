module.exports = {
  spouse1: {
    address: '0x8aFc344526Da71Ad9AdA5FCC076a35AB108DDF49',
    firstName: 'Ryan',
    lastName: 'Scarbery'
  },
  spouse2: {
    address: '0xb831c2b713307dd148cDE0797441da1e6ED2cEd8',
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
    baseURL: 'https://scarbery.com'
  },
  sentry: {
    org: 'ryan-scarbery',
    project: 'wedding-smart-contract'
  }
}