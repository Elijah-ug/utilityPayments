import { getLogicUtilityContract } from "@/utils/logicUtility";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const checkDataFromAcrossThunk = createAsyncThunk(
    "data/checkDataFromAcrossThunk",
    async ({ companyAddr }, { rejectWithValue }) => {
        try {
            const contract = await getLogicUtilityContract();
            console.log(contract.target)
            const imported = await contract.viewCompany(companyAddr);
            console.log("To confirm fn presense: ", contract.target)
            // const importedCompany = {
            //     companyAddr: imported[0],
            //     isActive: imported[1],
            //     name: imported[2]
            // }

            console.log("importedCompany: ", imported);
            return imported;
        } catch (error) {
            console.log(error.message);
            return rejectWithValue(error.message);
        }
    }
)
