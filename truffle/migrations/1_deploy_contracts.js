var OwnerToken = artifacts.require("OwnerToken");

module.exports = async function (deployer) {
  await deployer.deploy(OwnerToken, 1000000);
};
