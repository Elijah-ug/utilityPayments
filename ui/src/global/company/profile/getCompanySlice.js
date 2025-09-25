import { createSlice } from "@reduxjs/toolkit";
import { getCompanyProfiles } from "./getCompanyThunk";

const initialState = {
    profile: {
        companyAddr: null,
        balance: 0,
        isActive: false,
        name: null,
        utilityService: null
    },
    loading: false,
    error: null,
}

const getCompanySlice = createSlice({
    name: "company",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getCompanyProfiles.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCompanyProfiles.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
            })
            .addCase(getCompanyProfiles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Uncaught while fetching";
            })

    }
})
export default getCompanySlice.reducer;
