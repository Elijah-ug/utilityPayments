import { baseProxyAddress } from "../addresses/addresses";
import BaseUtilityUpgradeableABI from "../contracts/BaseUtilityUpgradeable.json"
import {ethers} from "ethers"

const getProvider = () => {
    if (window.ethereum) {
        return new ethers.BrowserProvider(window.ethereum);
    } else {
        throw new Error("Metamask not installed");
    }
}
const getSigner = async () => {
    const provider = getProvider();
    await provider.send("eth_requestAccounts", []);
    return await provider.getSigner()
}
const getBaseUtilityContract = async () => {
    try {
        const signer = await getSigner();
        const contract = new ethers.Contract(baseProxyAddress, BaseUtilityUpgradeableABI.abi, signer);
        // console.log(contract.target)
        return contract
    } catch (error) {
        console.log(error.message || "Failed to connect ")
    }
}
export { getProvider, getSigner, getBaseUtilityContract };
