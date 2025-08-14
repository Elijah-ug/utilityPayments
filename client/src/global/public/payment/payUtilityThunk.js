import { getLogicUtilityContract } from "@/utils/logicUtility";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { format } from "date-fns";
import { formatEther } from "ethers";
import { toast } from "react-toastify";

export const payUtilityThunk = createAsyncThunk(
    "payment/payUtilityThunk",
    async ({companyAddr, amount}, { rejectWithValue }) => {
        try {
            const contract = await getLogicUtilityContract();
            console.log(contract.target)
            const tx = await contract.payUtility(companyAddr, { value: amount });
            const txHash = tx.hash;
            const receipt = await tx.wait();
            const provider = contract.runner.provider || contract.provider;
            const block = await provider.getBlock(receipt.blockNumber);
            const baseScan_url = `https://sepolia.basescan.org/tx/${txHash}`
            const blockchainData = {
                transactionHash: txHash,
                blockNumber: receipt.blockNumber,
                timestamp: format(new Date(block.timestamp.toString() * 1000), "yyy-MMM-dd HH:mm:ss"),
                gasUsed: formatEther(receipt.gasUsed.toString()).toString(),
                from: receipt.from,
                to: receipt.to,
                baseScan_url,
            }
            toast.success("Payment made successfully!");
            console.log("blockchainData: " + blockchainData)
            return blockchainData;
        } catch (error) {
            console.log(error || "Unknown error happened");
            toast.error("Payment Failed");
            return rejectWithValue(error.message);
        }
    }
)
