import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const airportApi = createApi({
    reducerPath: "airportApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/v1"
    }),
    endpoints: (builder) => ({
        getAirports: builder.query({
            query: () => "/admin/airports",
            providesTags: ["Airports"],
        }),
        createAirport: builder.mutation({
            query: (data) => ({ url: "/admin/airports", method: "POST", body: data }),
            invalidatesTags: ["Airports"],
        }),
        updateAirport: builder.mutation({
            query: ({ id, body }) => ({ url: `/admin/airports/${id}`, method: "PUT", body, formData: true, }),
            invalidatesTags: ["Airports"],
        }),
        deleteAirport: builder.mutation({
            query: (id) => ({ url: `/admin/airports/${id}`, method: "DELETE" }),
            invalidatesTags: ["Airports"],
        }),
    })
});
export const {
    useGetAirportsQuery,
    useCreateAirportMutation,
    useUpdateAirportMutation,
    useDeleteAirportMutation,
} = airportApi;