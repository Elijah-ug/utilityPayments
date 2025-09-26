import { logicProxyAddress } from "../addresses/addresses";
import logicAbi from "../contracts/LogicUtilityUpgradable.json";
import BaseUtilityUpgradeableABI from "../contracts/BaseUtilityUpgradeable.json"
import { baseProxyAddress } from "../addresses/addresses";

export const usePayBlocks = { address: logicProxyAddress, abi: logicAbi.abi };

export const useBasePayBlocks = { address: baseProxyAddress, abi: BaseUtilityUpgradeableABI.abi };
