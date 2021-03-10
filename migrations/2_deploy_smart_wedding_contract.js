const secrets = require('../secrets.js');

const SmartWeddingContract = artifacts.require("SmartWeddingContract");

module.exports = function(deployer) {
  deployer.deploy(SmartWeddingContract, secrets.spouse1Address, secrets.spouse2Address);
};
