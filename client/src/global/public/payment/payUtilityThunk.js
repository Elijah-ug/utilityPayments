import { getLogicUtilityContract } from "@/utils/logicUtility";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const payUtilityThunk = createAsyncThunk(
    "payment/payUtilityThunk",
    async ({companyAddr, amount}, { rejectWithValue }) => {
        try {
            const contract = await getLogicUtilityContract();
            console.log(contract.target)
            const tx = await contract.payUtility(companyAddr, {value: amount});
            await tx.wait();
            toast.success("Payment made successfully!");
            return companies;
        } catch (error) {
            console.log(error || "Unknown error happened");
            toast.error("Payment Failed");
            return rejectWithValue(error.message);
        }
    }
)
