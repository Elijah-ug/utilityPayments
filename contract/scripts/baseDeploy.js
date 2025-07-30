const { ethers, upgrades } = require("hardhat")

const baseUtility = async () => {
  const utilityContract = await ethers.getContractFactory("BaseUtilityUpgradeable");
  const proxy = await upgrades.deployProxy(utilityContract, [], {
    initializer: "initialize"
  });
  await proxy.waitForDeployment();
  console.log("✅ Base Proxy deployed at: ", proxy.target);
}
baseUtility()
  .then(() => console.log("Deployed"))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
