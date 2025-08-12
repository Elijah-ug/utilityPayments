import { getLogicUtilityContract } from "@/utils/logicUtility";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { formatEther, parseEther } from "ethers";

export const getTotalTransactions = createAsyncThunk(
    "total/getTotalTransactions",
    async (_, { rejectWithValue }) => {
        try {
            const contract = await getLogicUtilityContract();
            const bal = await contract.totalPlatformTransactions();
            const totalTransactions =  formatEther(bal.toString()).toString();
            console.log("totalTransactions: " + totalTransactions);
            return totalTransactions;
        } catch (error) {
            console.log(error.message);
            return rejectWithValue(error.message)
        }
    }
)
