import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { createConfig, http } from "wagmi";
import { baseSepolia, mainnet, base, sepolia } from "wagmi/chains";
import { injected, walletConnect, metaMask, safe } from "wagmi/connectors";

export const chains = [mainnet, base, baseSepolia, sepolia];
export const transports = {
  [mainnet.id]: http(import.meta.env.VITE_MAINNET),
  [sepolia.id]: http(import.meta.env.VITE_SEPOLIA),
  [baseSepolia.id]: http(import.meta.env.VITE_BASESEPOLIA),
  [base.id]: http(import.meta.env.VITE_BASE),
};
// connectors: [injected(), walletConnect({  }), metaMask(), safe()]
export const config = getDefaultConfig({
  appName: "PayBlocks",
  projectId: import.meta.env.VITE_PROJECT_ID,
  chains,
  transports,
});
