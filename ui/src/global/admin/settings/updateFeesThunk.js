import { getLogicUtilityContract } from "@/utils/logicUtility";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const updateFees = createAsyncThunk(
    "fees/updateFees",
    async ({ fees }, { rejectWithValue }) => {
        try {
            const contract = await getLogicUtilityContract();
            console.log(contract.target)
            const fee = await contract.updateFees(fees);
            await fee.wait();
            toast.success("Fees updated successfully")
            return true;
        } catch (error) {
            console.log(error.message);
            return rejectWithValue(error.message || "Unknown Error");
        }
    }
)
