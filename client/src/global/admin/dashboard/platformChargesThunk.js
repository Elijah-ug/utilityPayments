import { getLogicUtilityContract } from "@/utils/logicUtility";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { formatEther } from "ethers";

export const getPlatformCharges = createAsyncThunk(
    "charges/getPlatformCharges",
    async (_, { rejectWithValue }) => {
        try {
            const contract = await getLogicUtilityContract();
            const tx = await contract.totalFeesCollected();
            const totalCharges = formatEther(tx.toString());
            console.log(totalCharges);
            return totalCharges;
        } catch (error) {
            console.log(error.message);
            return rejectWithValue(error.message)
        }
    }
)
