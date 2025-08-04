import { createSlice } from "@reduxjs/toolkit";
import { getPlatformTransactions } from "./platformTransactionsThunk";

const initialState = {
    totalTransactedAmount: "0",
    loading: false,
    error: null,
}
const platTotalTransactionsSlice = createSlice({
    name: "transactions",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getPlatformTransactions.pending, (state) => {
                state.loading = true;
            })
        .addCase(getPlatformTransactions.fulfilled, (state, action) => {
            state.loading = false;
            state.totalTransactedAmount = action.payload;
        })
        .addCase(getPlatformTransactions.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Unclear Error" ;
        })
    }
})
export default platTotalTransactionsSlice.reducer;
