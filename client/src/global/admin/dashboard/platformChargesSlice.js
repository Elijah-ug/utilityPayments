import { createSlice } from "@reduxjs/toolkit";
import { getPlatformCharges } from "./platformChargesThunk";

const initialState = {
    totalCharges: null,
    loading: false,
    error: null,
}
const platChargesSlice = createSlice({
    name: "charges",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getPlatformCharges.pending, (state) => {
                state.loading = true;
            })
        .addCase(getPlatformCharges.fulfilled, (state, action) => {
            state.loading = false;
            state.totalCharges = action.payload;
        })
        .addCase(getPlatformCharges.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})
export default platChargesSlice.reducer;
