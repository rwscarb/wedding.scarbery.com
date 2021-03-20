## Smart Wedding Contract 🤵👰

![Language](https://img.shields.io/badge/language-solidity-brightgreen.svg)
[![Ropsten](https://img.shields.io/badge/contract-ropsten-orange.svg)](https://ropsten.etherscan.io/address/0x4Ca8F76AE6Ea37E5e8ae776b0b14816d9B065D4E#code)
[![Application](https://img.shields.io/badge/application-live-e91e63.svg)](https://wedding.scarbery.com/)
![License](https://img.shields.io/badge/license-MIT-green.svg)

A smart marriage contract on Ethereum using Truffle, Drizzle and VueBootstrap.

## Install

Make sure `npm`, `Truffle` and `Ganache` is installed on your machine. `Truffle` is required with version `v5.2.3`.
Use `npm` to download all project dependencies:

```
npm install
```

## Development

First create a new file called `secrets.js` in the root of the project directory. The `privateMnemonics` are used by Truffle to deploy the contract.

```js
module.exports = {
  spouse1Address: '0xB7..50',
  spouse2Address: '0x87..E9',
  infuraProjectId: '5b0..b6f',
  privateMnemonics: {
    ropsten: 'foo bar baz'
  }
}

```

Make sure there is enough ETH on the wallet to cover deployment costs. Compile and deploy the smart contract to the private testnet using `Truffle`:

```shell
truffle deploy
```

If you only want to deploy a specific migration (e.g. to save gas):

```shell
truffle deploy -f <migration number> --to <migration number>
```

Start the web server:

```shell
npm run serve
```

## Usage

The smart contract is already deployed and can be found at:

### Ethereum Networks

#### Ropsten (Testnet)

👉 find it on [Etherscan](https://ropsten.etherscan.io/address/0x4Ca8F76AE6Ea37E5e8ae776b0b14816d9B065D4E#code)

Feel free to install MetaMask and interact with the contract (as far as you are allowed to 😉).

### Assets

Assets are stored in an encrypted format on the blockchain to ensure privacy. Ethereum does not support encryption at the moment so `CryptoJS` is used to perform client side encryption/decryption. You can access the encrypted assets on the `Ropsten` testnet using the key: `setecastronomy`

## Licence

This project is licensed under the MIT license. For more information see LICENSE.md.