import { createSlice } from "@reduxjs/toolkit";
import { getCompanyBalance } from "./companyBalancesThunk";

const initialState = {
    balance: null,
    loading: false,
    error: null,
}
const getCompanyBalanceSlice = createSlice({
    name: "companyBalance",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getCompanyBalance.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCompanyBalance.fulfilled, (state, action) => {
                state.loading = false;
                state.balance = action.payload;
            })
            .addCase(getCompanyBalance.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})
export default getCompanyBalanceSlice.reducer;
