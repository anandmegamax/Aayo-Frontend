import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const bookingApi = createApi({
    reducerPath: "bookingApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/v1"
    }),
    endpoints: (builder) => ({
        createBooking: builder.mutation({
            query: (body) => ({ url: '/admin/bookings', method: 'POST', body })
        }),
        getBookings: builder.query({
            query: () => '/admin/bookings',
        }),
        getBookingById: builder.query({
            query: (id) => `/admin/bookings/${id}`
        }),
        addPayment: builder.mutation({
            query: ({ id, body }) => ({
                url: `/admin/bookings/${id}/payment`,
                method: 'POST',
                body
            })
        }),
        updatePayment: builder.mutation({
            query: ({ id, body }) => ({
                url: `/admin/bookings/${id}/payments`,
                method: "PUT",
                body,
            }),
        }),
        updateBooking: builder.mutation({
            query: ({ id, data }) => ({
                url: `/admin/bookings/${id}`,
                method: 'PUT',
                body: data,
            }),
        }),
        deleteBooking: builder.mutation({
            query: (id) => ({
                url: `/admin/bookings/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Booking']
        })
    })
})

export const {
    useCreateBookingMutation,
    useGetBookingsQuery,
    useGetBookingByIdQuery,
    useAddPaymentMutation,
    useUpdateBookingMutation,
    useDeleteBookingMutation,
    useUpdatePaymentMutation
} = bookingApi;