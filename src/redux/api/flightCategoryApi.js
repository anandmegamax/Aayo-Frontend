import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const flightCategoryApi = createApi({
    reducerPath: 'flightCategoryApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/v1',
    }),
    tagTypes: ['FlightCategories'],
    endpoints: (builder) => ({
        getFlightCategories: builder.query({
            query: () => '/admin/flight-category',
            providesTags: ['FlightCategories'],
        }),
        createFlightCategory: builder.mutation({
            query: (data) => ({
                url: '/admin/flight-category',
                method: 'POST',
                body: data,
                // formData: true,
            }),
            invalidatesTags: ['FlightCategories'],
        }),
        updateFlightCategory: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/admin/flight-category/${id}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ['FlightCategories'],
        }),
        deleteFlightCategory: builder.mutation({
            query: (id) => ({
                url: `/admin/flight-category/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['FlightCategories'],
        }),
        getFlightCategoryById: builder.query({
            query: (id) => `/admin/flight-category/${id}`,
            providesTags: (result, error, id) => [{ type: 'FlightCategories', id }],
        }),
    }),
});
export const {
    useGetFlightCategoriesQuery,
    useCreateFlightCategoryMutation,
    useUpdateFlightCategoryMutation,
    useDeleteFlightCategoryMutation,
    useGetFlightCategoryByIdQuery,
} = flightCategoryApi;