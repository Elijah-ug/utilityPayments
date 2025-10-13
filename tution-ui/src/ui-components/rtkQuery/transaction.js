import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const transactionApi = createApi({
  reducerPath: 'transactions',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_TX_API }),
  tagTypes: ['transaction'],
  endpoints: (build) => ({
    getAllTransactions: build.query({
      query: () => '',
    }),

    getOneTransaction: build.query({
      query: (id) => `${id}`,
      providesTags: (result, error, id) => [{ type: 'Transaction', id }],
    }),

    addTransaction: build.mutation({
      query: (newTx) => ({
        url: '',
        method: 'POST',
        body: newTx,
      }),
      // invalidate the LIST so getAllTransactions refetches
      invalidatesTags: [{ type: 'Transaction', id: 'LIST' }],
    }),
  }),
});

export const { useGetAllTransactionsQuery, useGetTransactionQuery, useAddTransactionMutation } =
  transactionApi;
