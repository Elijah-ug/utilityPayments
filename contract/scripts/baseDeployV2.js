const { ethers, upgrades } = require("hardhat")
require("dotenv").config();

const baseUtilityV2 = async () => {
    const proxyAddr = process.env.MAIN_CONTRACT_PROXY_ADDRESS
  const utilityContract = await ethers.getContractFactory("BaseUtilityUpgradeable");
  const upgraded = await upgrades.upgradeProxy(proxyAddr, utilityContract );
  await upgraded.waitForDeployment();
  console.log("✅ Contract upgraded at:", upgraded.target);
}
baseUtilityV2()
  .then(() => console.log("Deployed"))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
