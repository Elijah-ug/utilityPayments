const { ethers, upgrades } = require("hardhat")

const logicUtility = async () => {
    const baseContractProxyAddress = ""
    const logicContract = await ethers.getContractFactory("LogicUtilityUpgradable");
    const logicProxy = await upgrades.deployProxy(logicContract, [baseContractProxyAddress], {
        initializer: "initialize"
    });
    await logicProxy.waitForDeployment();
    console.log("✅ Proxy deployed at: ", logicProxy.getAddress());
}
logicUtility()
    .then(() => console.log("Deployed Logic proxy"))
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });
