import { logicProxyAddress } from "../addresses/addresses";
import logicUtilityUpgradeableABI from "../contracts/LogicUtilityUpgradable.json"
import {ethers} from "ethers"

const getLogicProvider = () => {
    if (window.ethereum) {
        return new ethers.BrowserProvider(window.ethereum);
    } else {
        throw new Error("Metamask not installed");
    }
}
const getLogicSigner = async () => {
    const provider = getLogicProvider();
    await provider.send("eth_requestAccounts", []);
    return await provider.getSigner()
}
const getLogicUtilityContract = async () => {
    try {
        const signer = await getLogicSigner();
        const contract = new ethers.Contract(logicProxyAddress, logicUtilityUpgradeableABI.abi, signer)
        return contract;
    } catch (error) {
        console.log(error.message || "Failed to connect ")
    }
}
export { getLogicProvider, getLogicSigner, getLogicUtilityContract };
