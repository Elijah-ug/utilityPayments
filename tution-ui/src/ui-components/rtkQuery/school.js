import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const schoolApi = createApi({
  reducerPath: 'schools',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SCHOOL_API }),
  endpoints: (build) => ({
    getSchools: build.query({
      query: () => '',
    }),
    addSchool: build.mutation({
      query: (newSchool) => ({
        url: '',
        method: 'POST',
        body: newSchool,
      }),
    }),
    updateSchool: build.mutation({
      query: ({ schoolId, ...updatedData }) => {
        console.log('Sending update to:', schoolId, updatedData); // Add this
        return { url: `/${schoolId}`, method: 'PUT', body: updatedData };
      },
    }),
  }),
});
export const { useGetSchoolsQuery, useAddSchoolMutation, useUpdateSchoolMutation } = schoolApi;
