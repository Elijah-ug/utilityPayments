import { createConfig, http } from "wagmi";
import { baseSepolia, mainnet, base, sepolia } from "wagmi/chains";
import { injected, walletConnect, metaMask, safe } from "wagmi/connectors";
export const config = createConfig({
  chains: [mainnet, base, baseSepolia, sepolia],
  connectors: [injected(), walletConnect({ projectId: import.meta.env.VITE_PROJECT_ID }), metaMask(), safe()],
  transports: {
    [mainnet.id]: http(import.meta.env.VITE_MAINNET),
    [sepolia.id]: http(import.meta.env.VITE_SEPOLIA),
    [baseSepolia.id]: http(import.meta.env.VITE_BASESEPOLIA),
    [base.id]: http(import.meta.env.VITE_BASE),
  },
});
