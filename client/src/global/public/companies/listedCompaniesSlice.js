import  { createSlice } from "@reduxjs/toolkit"
import  { listedCompanies } from "./listedCompaniesThunk"

const initialState = {
    registeredCompanies: {
        companyAddr: null,
        balance: 0,
        isActive: false,
        name: null,
        utilityService: null
    },
    loading: false,
    error: null,
}
const listedCompaniesSlice = createSlice({
    name: "listedCompanies",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(listedCompanies.pending, (state) => {
                state.loading = true;
            })
            .addCase(listedCompanies.fulfilled, (state, action) => {
                state.loading = false;
                state.registeredCompanies = action.payload;
            })
            .addCase(listedCompanies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
        })
    }
})
export default listedCompaniesSlice.reducer;
