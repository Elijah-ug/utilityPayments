import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

export const transactionApi = createApi({
  reducerPath: 'transactions',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_TX_API }),
  tagTypes: ['transaction'],
  endpoints: (build) => ({
    getAllTransactions: build.query({
      query: () => '',
    }),

    getOneTransaction: build.query({
      query: (id) => {
        `${id}`;
      },
    }),

    addTransaction: build.mutation({
      query: (newTx) => ({
        url: '',
        method: 'POST',
        body: newTx,
      }),
    }),
  }),
});
