import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const facilityApi = createApi({
    reducerPath: "facilityApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/v1"
    }),
    endpoints: (builder) => ({
        createFacility: builder.mutation({
            query: (facilityData) => ({
                url: "/admin/facilities",
                method: "POST",
                body: facilityData
            })
        }),
        getAllFacilities: builder.query({
            query: () => "/admin/facilities"
        }),
        updateFacility: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: `/admin/facilities/${id}`,
                method: "PUT",
                body: rest
            })
        }),
        deleteFacility: builder.mutation({
            query: (id) => ({
                url: `/admin/facilities/${id}`,
                method: "DELETE"
            })
        })
    })
});

export const {
    useCreateFacilityMutation,
    useGetAllFacilitiesQuery,
    useUpdateFacilityMutation,
    useDeleteFacilityMutation
} = facilityApi;
