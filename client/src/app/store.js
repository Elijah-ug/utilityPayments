import { configureStore } from "@reduxjs/toolkit";
import connectWalletSliceReducer from "../global/auth/walletSlice";
import getCompanySliceReducer from "../global/company/profile/getCompanySlice";
import getCompanyBalanceSliceReducer from "../global/company/public/balance/companyBalanceSlice";
import listedCompaniesSliceReducer from "../global/public/companies/listedCompaniesSlice";
import getPlatformTransactionsSliceReducer from "../global/public/balances/transactionsSlice.js";
import platformRateSliceReducer from "../global/public/rates/platformRateSlice";
import getReceiptsSliceReducer from "../global/public/user/receiptSlice";
import platChargesSliceReducer from "../global/admin/dashboard/platformChargesSlice";
import companyReceiptsSliceReducer from "../global/company/public/receipts/companyReceiptsSlice";

export const store = configureStore({
    reducer: {
        "wallet": connectWalletSliceReducer,
        "company": getCompanySliceReducer,
        "companyBalance": getCompanyBalanceSliceReducer,
        "listedCompanies": listedCompaniesSliceReducer,
        "volumeTx": getPlatformTransactionsSliceReducer,
        "rate": platformRateSliceReducer,
        "receipt": getReceiptsSliceReducer,
        "charges": platChargesSliceReducer,
        "companyReceipts": companyReceiptsSliceReducer,
    }
})
