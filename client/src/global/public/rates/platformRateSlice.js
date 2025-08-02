import { createSlice } from "@reduxjs/toolkit";
import { fetchPlatformRate } from "./platformRateThunk";

const initialState = {
    parsedplatformRate: null,
    loading: false,
    error: null,
}
const platformRateSlice = createSlice({
    name: "rate",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchPlatformRate.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPlatformRate.fulfilled, (state, action) => {
                state.loading = false;
                state.parsedplatformRate = action.payload;
            })
            .addCase(fetchPlatformRate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})
export default platformRateSlice.reducer;
