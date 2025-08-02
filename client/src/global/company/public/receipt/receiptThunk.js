import { getLogicUtilityContract } from "@/utils/logicUtility";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { formatEther, formatUnits } from "ethers";
import {format} from "date-fns"

export const getReceiptThunk = createAsyncThunk(
    "receipt/getReceiptThunk",
    async (_, { rejectWithValue }) => {
        try {
            const contract = await getLogicUtilityContract();
            const receipt = await contract.getReceipt();
            const receipts = {
                company: receipt[0],
                payer: receipt[1],
                amount: formatUnits(receipt[2].toString()),
                platformFee: formatUnits(receipt[3].toString()),
                netPaid: formatUnits(receipt[4].toString()).toString(),
                timestamp: format(new Date(receipt[5].toString() * 1000), "yyy-MMM-dd HH:mm:ss"),
                id: receipt[6].toString(),
            }
            console.log("receipts: ", receipts)
            return receipts;
        } catch (error) {
            console.log(error.message);
            return rejectWithValue(error.message)
        }
    }
)
