const { ethers, upgrades } = require("hardhat");
const tution = async () => {
  const stableToken = process.env.STABLE_TOKEN;
  const contract = await ethers.getContractFactory("Tution");
  const deployContract = await upgrades.deployProxy(contract, [stableToken], {
    initializer: "initialize",
  });
  await deployContract.waitForDeployment();
  console.log("✅ Contract upgraded at:", deployContract.target);
};

tution()
  .then(() => console.log("deployed successfully"))
  .catch((error) => {
    console.log(error.message);
    extendEnvironment.process(1);
  });
