const { ethers, upgrades } = require("hardhat");
require("dotenv").config();

const logicUtility = async () => {
    const baseContractProxyAddress = process.env.MAIN_CONTRACT_PROXY_ADDRESS;
    const logicContract = await ethers.getContractFactory("LogicUtilityUpgradable");
    const logicProxy = await upgrades.deployProxy(logicContract, [baseContractProxyAddress], {
        initializer: "initialize"
    });
    await logicProxy.waitForDeployment();
    console.log("✅ Proxy deployed at: ", logicProxy.target);
}
logicUtility()
    .then(() => console.log("Deployed Logic proxy"))
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });
