import { configureStore } from "@reduxjs/toolkit";
import connectWalletSliceReducer from "../global/auth/walletSlice";
import getCompanySliceReducer from "../global/company/profile/getCompanySlice";
import getCompanyBalanceSliceReducer from "../global/company/public/balance/companyBalanceSlice";
import listedCompaniesSliceReducer from "../global/public/companies/listedCompaniesSlice";
import platTotalTransactionsSliceReducer from "../global/public/balances/transactionsSlice.js";
import platformRateSliceReducer from "../global/public/rates/platformRateSlice";
import getReceiptsSliceReducer from "../global/company/public/receipt/receiptSlice";
import platChargesSliceReducer from "../global/admin/dashboard/platformChargesSlice";

export const store = configureStore({
    reducer: {
        "wallet": connectWalletSliceReducer,
        "company": getCompanySliceReducer,
        "companyBalance": getCompanyBalanceSliceReducer,
        "listedCompanies": listedCompaniesSliceReducer,
        "transactions": platTotalTransactionsSliceReducer,
        "rate": platformRateSliceReducer,
        "receipt": getReceiptsSliceReducer,
        "charges": platChargesSliceReducer
    }
})
