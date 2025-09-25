import { getBaseUtilityContract } from "@/utils/baseUtility";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { parseEther } from "ethers";

export const listedCompanies = createAsyncThunk(
    "list/listedCompanies",
    async (_, { rejectWithValue }) => {
        try {
            const contract = await getBaseUtilityContract();
            // console.log("contract.target: ", contract.target)
            const companies = await contract.getRegisteredCompanies();
             console.log("companies: ", companies)
            const registeredCompanies = companies.map((company) => ({
                companyAddr: company[0],
                balance: parseEther(company[1].toString()).toString(),
                isActive: company[2],
                name: company[3],
                utilityService: company[4]
            }))
            console.log(typeof(registeredCompanies));
            return registeredCompanies;
        } catch (error) {
            console.log(error.message || "Unknown error happened");
            return rejectWithValue(error.message);
        }
    }
)
