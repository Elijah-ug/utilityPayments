import { AFB_ABI } from "../abi/tokenabi";
import contractabi from "../abi/Tution.json";
import { contractAddress, tokenAddr } from "../address/address";

export const wagmiContractConfig = { address: contractAddress, abi: contractabi.abi };

export const tokenContractConfig = { address: tokenAddr, abi: AFB_ABI };
