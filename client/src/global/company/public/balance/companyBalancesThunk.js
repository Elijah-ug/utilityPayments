import { getLogicUtilityContract } from "@/utils/logicUtility";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { parseEther } from "ethers";

export const getCompanyBalance = createAsyncThunk(
    "balance/getCompanyBalance",
    async ({ address }, { rejectWithValue }) => {
        try {
            const contract = await getLogicUtilityContract();
            const bal = await contract.getCompanyBalance(address);
            const balance = parseEther(bal.toString()).toString();
            console.log(balance)
            return balance;
        } catch (error) {
            console.log(error.message);
            return rejectWithValue(error.message)
        }
    }
)
