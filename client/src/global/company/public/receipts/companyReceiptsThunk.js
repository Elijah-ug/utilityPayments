import { createAsyncThunk } from "@reduxjs/toolkit";
import { formatEther, formatUnits } from "ethers";
import {format} from "date-fns"
import { getLogicUtilityContract } from "@/utils/logicUtility";

export const getCompanyReceiptThunk = createAsyncThunk(
    "receipt/getReceiptThunk",
    async (_, { rejectWithValue }) => {
        try {
            const contract = await getLogicUtilityContract();
            console.log(contract.target)
            const receipt = await contract.getCompanyReceipts();

            const mappedReceipts = receipt.map(([company, payer, amount, platformFee, netPaid, timestamp, id]) => ({
            company,
            payer,
            amount: formatUnits(amount, 18),
            platformFee: formatUnits(platformFee, 18),
            netPaid: formatUnits(netPaid, 18),
                timestamp: new Date(Number(timestamp) * 1000).toLocaleDateString("en-us", {
                    year: "numeric",
                    month: "short",
                    day: "numeric"
            }),
            id: id.toString(),
        }))

            console.log("mappedReceipts: ", mappedReceipts)
            return mappedReceipts;
        } catch (error) {
            console.log(error.message);
            return rejectWithValue(error.message)
        }
    }
)
