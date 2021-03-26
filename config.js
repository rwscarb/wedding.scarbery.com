module.exports = {
  spouse1Address: process.env.SPOUSE_1 || '0xB747BC6b537Af5C8E9C3a4727Fe58ffAd7fDE8f2',
  spouse2Address: process.env.SPOUSE_2 || '0x87BEf8A37eFcec39d2bC44Bc2F4Cdd830d9d8CE9',
  infuraProjectId: process.env.INFURA_PROJECT_ID || '5b0b1d1df587462ea847296efa599b6f',
  networks: {
    ropsten: {
      mnemonic: process.env.PRIVATE_MNEMONIC || ''
    }
  }
}