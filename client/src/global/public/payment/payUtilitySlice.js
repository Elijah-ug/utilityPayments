import { createSlice } from "@reduxjs/toolkit";
import { payUtilityThunk } from "./payUtilityThunk";

const initialState = {
    blockchainData: [],
    loading: false,
    error: null
}
const payUtilitySlice = createSlice({
    name: "payment",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(payUtilityThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(payUtilityThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.blockchainData.push(action.payload);
            })
            .addCase(payUtilityThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})
export default payUtilitySlice.reducer;
