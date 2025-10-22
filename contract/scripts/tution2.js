const { ethers, upgrades } = require("hardhat");

const tutionUpgrade = async () => {
  const oldTutionAddr = process.env.TUTION_CONTRACT_ADDRESS;
  if (!oldTutionAddr) {
    throw new Error("❌ Missing oldTutionAddr in .env");
  }

  const newTutionContract = await ethers.getContractFactory("Tution");
  const upgradedTution = await upgrades.upgradeProxy(
    oldTutionAddr,
    newTutionContract,
  );
  await upgradedTution.waitForDeployment();
  console.log("✅ Contract upgraded at:", upgradedTution.target);
  const implAddress =
    await upgrades.erc1967.getImplementationAddress(oldTutionAddr);
  console.log("Current implementation:", implAddress);
};
tutionUpgrade()
  .then(() => {
    console.log("✅ Contract upgraded ");
  })
  .catch((error) => {
    console.log("❌ Error==> " + error);
    process.exit(1);
  });
