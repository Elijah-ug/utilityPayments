import { createSlice } from "@reduxjs/toolkit";
import { getCompanyReceiptThunk } from "./companyReceiptsThunk";

const initialState = {
    mappedReceipts: [],
    loading: false,
    error: null,
}
const companyReceiptsSlice = createSlice({
    name: "companyReceipts",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getCompanyReceiptThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCompanyReceiptThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.mappedReceipts = action.payload;
            })
         .addCase(getCompanyReceiptThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})
export default companyReceiptsSlice.reducer;
