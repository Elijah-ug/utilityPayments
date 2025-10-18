import { configureStore } from '@reduxjs/toolkit';
import { schoolApi } from '../ui-components//rtkQuery/school';
import { setupListeners } from '@reduxjs/toolkit/query';
import { transactionApi } from '@/ui-components/rtkQuery/transaction';

export const store = configureStore({
  reducer: {
    [schoolApi.reducerPath]: schoolApi.reducer,
    [transactionApi.reducerPath]: transactionApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(schoolApi.middleware, transactionApi.middleware),
});
setupListeners(store.dispatch);
