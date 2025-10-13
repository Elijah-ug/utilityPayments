import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const schoolApi = createApi({
  reducerPath: 'schools',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SCHOOL_API }),
  endpoints: (build) => ({
    getSchools: build.query({
      query: () => '',
    }),
    addSchool: build.mutation({
      query: (newSchool)=>({
        url: "",
        method: "POST",
        body: newSchool,
      })
    }),
    updateSchool: build.mutation({
      query: ({id, ...updatedData})=>({
        url: `${id}`,
        method: "PUT",
        body: updatedData
      })
    })
  }),
});
export const { useGetSchoolsQuery, useAddSchoolMutation, useUpdateSchoolMutation } = schoolApi;
