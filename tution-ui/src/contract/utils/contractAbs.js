import contractabi from "../abi/Tution.json";
import { address } from "../address/address";
const { abi } = contractabi;
console.log("abi ==>", abi);
export const wagmiContractConfig = { address, abi };
