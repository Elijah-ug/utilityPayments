import { createSlice } from "@reduxjs/toolkit";
import { getTotalTransactions } from "./totalTransactionsThunk";

const initialState = {
    totalTransactions: null,
    loading: false,
    error: null,
}
const getPlatformTransactionsSlice = createSlice({
    name: "volumeTx",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getTotalTransactions.pending, (state) => {
                state.loading = true;
            })
            .addCase(getTotalTransactions.fulfilled, (state, action) => {
                state.loading = false;
                state.totalTransactions = action.payload;
            })
            .addCase(getTotalTransactions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})
export default getPlatformTransactionsSlice.reducer;
