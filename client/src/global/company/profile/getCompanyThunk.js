import { getBaseUtilityContract } from "@/utils/baseUtility";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { parseEther } from "ethers";

export const getCompanyProfiles = createAsyncThunk(
    "company/getCompanyProfiles",
    async ({ address }, { rejectWithValue }) => {
        try {
            const contract = await getBaseUtilityContract();
            const prof = await contract.getCompany(address);
            const profile = {
                companyAddr: prof[0],
                balance: parseEther(prof[1].toString()).toString(),
                isActive: prof[2],
                name: prof[3],
                utilityService: prof[4]
            }
            console.log(profile);
            return profile;
        } catch (error) {
            console.log(error.message);
            return rejectWithValue(error.message)
        }
    }
)
