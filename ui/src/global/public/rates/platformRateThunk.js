import { getLogicUtilityContract } from "@/utils/logicUtility";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { formatEther, formatUnits } from "ethers";

export const fetchPlatformRate = createAsyncThunk(
    "rate/fetchPlatformRate",
    async (_, { rejectWithValue }) => {
        try {
            const contract = await getLogicUtilityContract();
            const platformRate = await contract.feePercentage();
            const parsedplatformRate = platformRate.toString();
            console.log(parsedplatformRate);
            return parsedplatformRate;
        } catch (error) {
            console.log(error.message);
            return rejectWithValue(error.message)
        }
    }
)
