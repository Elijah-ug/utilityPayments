import { getBaseUtilityContract } from "@/utils/baseUtility";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const registerCompany = createAsyncThunk(
    "create/registerCompany",
    async ({ companyAddr, companyName, utilityService }, { rejectWithValue }) => {
        try {
            const contract = await getBaseUtilityContract();
            console.log(contract.target)
            const register = await contract.registerCompany(companyAddr, companyName, utilityService);
            await register.wait();
            console.log("Registered Successfully");
            return true;
        } catch (error) {
            console.log(error.message);
            return rejectWithValue(error.message || "Unknown Error");
        }
    }
)
