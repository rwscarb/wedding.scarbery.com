const config = require('../config.js');

const GuestBook = artifacts.require("GuestBook");
const SmartWeddingContract = artifacts.require("SmartWeddingContract");

module.exports = async function (deployer) {
  await deployer.deploy(GuestBook, config.spouse1Address, config.spouse2Address);
  const gb = await GuestBook.deployed();
  await deployer.deploy(SmartWeddingContract, gb.address, config.spouse1Address, config.spouse2Address);
  const swc = await SmartWeddingContract.deployed();
  await gb.setContractOwner(swc.address);
};
