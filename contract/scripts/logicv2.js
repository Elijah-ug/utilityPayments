const { ethers, upgrades } = require("hardhat");
require("dotenv").config();

const logicV2 = async () => {
  const proxyAddr = process.env.LOGIC_CONTRACT_PROXY_ADDRESS;
  console.log(typeof (proxyAddr));
  if (!proxyAddr) {
    throw new Error("❌ Missing LOGIC_CONTRACT_PROXY_ADDRESS in .env");
  }

  const newLogicContract = await ethers.getContractFactory("LogicUtilityUpgradable");
  const upgraded = await upgrades.upgradeProxy(proxyAddr, newLogicContract );
  await upgraded.waitForDeployment();
  console.log("✅ Contract upgraded at:", upgraded.target);
  
  const implAddress = await upgrades.erc1967.getImplementationAddress(proxyAddr);
   console.log("Current implementation:", implAddress);

}
logicV2()
  .then(() => console.log("Deployed"))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
