const config = require('../config.js');

const SmartWeddingContract = artifacts.require("SmartWeddingContract");

module.exports = function(deployer) {
  deployer.deploy(SmartWeddingContract, config.spouse1Address, config.spouse2Address);
};
