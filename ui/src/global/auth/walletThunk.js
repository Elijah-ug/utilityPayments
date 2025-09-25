import { createAsyncThunk } from "@reduxjs/toolkit";

export const connectWallet = createAsyncThunk(
    "wallet/connectWallet",
    async (_, { rejectWithValue }) => {

        try {
            if (!window.ethereum) return console.log("Metamask not detected");

            const baseSepoliaChainId = "0x14a34";
            let updatedChainId = await window.ethereum.request({ method: "eth_chainId" });

            if (updatedChainId !== baseSepoliaChainId) {
                await window.ethereum.request({
                    method: "wallet_switchEthereumChain",
                    params: [{chainId: baseSepoliaChainId}]
                })
                // refetching chainId
                 updatedChainId = await window.ethereum.request({ method: "eth_chainId" });
            }
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            if (!accounts || accounts.length === 0) {
                return rejectWithValue("Wallet not connected");
            }
            console.log(updatedChainId)
            return {address: accounts[0], chainId: updatedChainId}
        } catch (error) {
            console.log(error.message)
        }
    }
)
