const Airdrop = artifacts.require("Airdrop");

module.exports = function(deployer) {
  deployer.deploy(Airdrop,'0x804aC31517A9d8C15320367195e3703c26f7459f');
};
