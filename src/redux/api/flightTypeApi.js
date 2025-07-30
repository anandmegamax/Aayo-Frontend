import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const flightTypeApi = createApi({
    reducerPath: "flightTypeApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/v1"
    }),
    endpoints: (builder) => ({
        getFlightTypes: builder.query({
            query: () => "/admin/flight-types",
            providesTags: ["FlightTypes"],
        }),
        createFlightType: builder.mutation({
            query: (data) => ({
                url: "/admin/flight-types",
                method: "POST",
                body: data,
                formData: true,
            }),
            invalidatesTags: ["FlightTypes"],
        }),
        updateFlightType: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/admin/flight-types/${id}`,
                method: "PUT",
                body: formData,
            }),
            invalidatesTags: ["FlightTypes"],
        }),
        deleteFlightType: builder.mutation({
            query: (id) => ({
                url: `/admin/flight-types/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["FlightTypes"],
        }),
    })
})

export const {
    useGetFlightTypesQuery,
    useCreateFlightTypeMutation,
    useUpdateFlightTypeMutation,
    useDeleteFlightTypeMutation,
} = flightTypeApi;