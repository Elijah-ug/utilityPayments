import { getLogicUtilityContract } from "@/utils/logicUtility";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { formatEther } from "ethers";

export const getPlatformTransactions = createAsyncThunk(
    "sum/getPlatformTransactions",
    async (_, { rejectWithValue }) => {
        try {
            const contract = await getLogicUtilityContract();
            const tx = await contract.totalPlatformTransactions();
            const totalTransactedAmount = formatEther(tx.toString());
            console.log(totalTransactedAmount)
            return totalTransactedAmount;
        } catch (error) {
            console.log(error.message);
            return rejectWithValue(error.message)
        }
    }
)
