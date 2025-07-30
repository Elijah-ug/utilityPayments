import { configureStore } from "@reduxjs/toolkit";
import connectWalletSliceReducer from "../global/auth/walletSlice";
import getCompanySliceReducer from "../global/company/profile/getCompanySlice";
import getCompanyBalanceSliceReducer from "../global/company/public/balance/companyBalanceSlice";
import getPlatformTransactionsSliceReducer from "../global/public/balances/transactionsSlice.js";
import listedCompaniesSliceReducer from "../global/public/companies/listedCompaniesSlice";
import platTotalTransactionsSlice from "../global/admin/dashboard/platformTransactionsSlice";

export const store = configureStore({
    reducer: {
        "wallet": connectWalletSliceReducer,
        "company": getCompanySliceReducer,
        "companyBalance": getCompanyBalanceSliceReducer,
        "sum": getPlatformTransactionsSliceReducer,
        "listedCompanies": listedCompaniesSliceReducer,
        "sumTransactions": platTotalTransactionsSlice,
    }
})
