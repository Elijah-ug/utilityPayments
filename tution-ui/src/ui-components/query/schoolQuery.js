import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { build } from "vite";
export const schoolApi = createApi({
  reducerPath: "schools",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SCHOOL_API }),
  endpoints: (build) => {
    // get all products
    getSchools: build.query({
      query: () => "",
      providesTags: ["schools"],
    });
  },
});
export const { useGetSchoolsQuery } = schoolApi;
export default schoolApi;
