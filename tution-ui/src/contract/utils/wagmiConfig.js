import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, base, baseSepolia, sepolia } from "viem/chains";
import { http } from "wagmi";

export const chains = [mainnet, base, baseSepolia, sepolia];
const transports = {
  [mainnet.id]: http(import.meta.env.VITE_MAINNET),
  [sepolia.id]: http(import.meta.env.VITE_SEPOLIA),
  [baseSepolia.id]: http(import.meta.env.VITE_BASESEPOLIA),
  [base.id]: http(import.meta.env.VITE_BASE),
};

export const config = getDefaultConfig({
  appName: "TutionPayment",
  projectId: import.meta.env.VITE_PROJECT_ID,
  chains,
  transports,
});
