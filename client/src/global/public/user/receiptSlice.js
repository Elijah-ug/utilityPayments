import { createSlice } from "@reduxjs/toolkit";
import { getReceiptThunk } from "./receiptThunk";

const initialState = {
    receipts: null,
    loading: false,
    error: null,
}
const getReceiptsSlice = createSlice({
    name: "receipt",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getReceiptThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getReceiptThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.receipts = action.payload;
            })
            .addCase(getReceiptThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})
export default getReceiptsSlice.reducer;
