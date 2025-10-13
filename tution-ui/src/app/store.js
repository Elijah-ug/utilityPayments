import { configureStore } from '@reduxjs/toolkit';
import { schoolApi } from '../ui-components//rtkQuery/school';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    [schoolApi.reducerPath]: schoolApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(schoolApi.middleware),
});
// setupListeners(store.dispatch)  ===> for refetch on focus
