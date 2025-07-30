import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const flightApi = createApi({
    reducerPath: "flightApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/v1"
    }),
    endpoints: (builder) => ({
        getFlights: builder.query({
            query: () => "/admin/flights",
            providesTags: ["Flights"],
        }),
        createFlight: builder.mutation({
            query: (data) => ({ url: "/admin/flights", method: "POST", body: data }),
            invalidatesTags: ["Flights"],
        }),
        updateFlight: builder.mutation({
            query: ({ id, data }) => ({ url: `/admin/flights/${id}`, method: "PUT", body: data }),
            invalidatesTags: ["Flights"],
        }),
        deleteFlight: builder.mutation({
            query: (id) => ({ url: `/admin/flights/${id}`, method: "DELETE" }),
            invalidatesTags: ["Flights"],
        }),
        toggleFlightStatus: builder.mutation({
            query: (id) => ({ url: `/admin/flights/${id}/toggle`, method: "PUT" }),
            invalidatesTags: ["Flights"],
        }),
    })
})

export const {
    useGetFlightsQuery,
    useCreateFlightMutation,
    useUpdateFlightMutation,
    useDeleteFlightMutation,
    useToggleFlightStatusMutation,
} = flightApi;