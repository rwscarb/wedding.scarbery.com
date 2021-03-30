const config = require('../config.js');

const GuestBook = artifacts.require("GuestBook");
const SmartWeddingContract = artifacts.require("SmartWeddingContract");

module.exports = async function (deployer) {
  await deployer.deploy(GuestBook, config.spouse1.address, config.spouse2.address);
  const gb = await GuestBook.deployed();
  await deployer.deploy(SmartWeddingContract, gb.address, config.spouse1.address, config.spouse2.address);
  const swc = await SmartWeddingContract.deployed();
  await gb.setContractOwner(swc.address);
};
