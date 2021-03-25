const config = require('../config.js');

const GuestBook = artifacts.require("GuestBook");
const SmartWeddingContract = artifacts.require("SmartWeddingContract");

module.exports = async function (deployer) {
  await deployer.deploy(GuestBook, config.spouse1Address, config.spouse2Address);
  const guestBookContract = await GuestBook.deployed();
  await deployer.deploy(SmartWeddingContract, guestBookContract.address, config.spouse1Address, config.spouse2Address);
  const smartWeddingContract = await SmartWeddingContract.deployed();
  await guestBookContract.setContractOwner(smartWeddingContract.address);
};
