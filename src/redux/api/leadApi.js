import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const leadApi = createApi({
    reducerPath: "leadApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/v1"
    }),
    endpoints: (builder) => ({
        addLead: builder.mutation({
            query: (data) => ({
                url: "/admin/leads",
                method: "POST",
                body: data,
            }),
        }),
        getLeads: builder.query({
            query: (params) => ({
                url: `/admin/leads`,
                params,
            }),
        }),
        getLeadById: builder.query({
            query: (id) => `/admin/leads/${id}`,
        }),
        getLeadRemarks: builder.query({
            query: (leadId) => `/admin/lead/${leadId}/remarks`,
            providesTags: (result, error, leadId) => [{ type: "LeadRemarks", id: leadId }],
        }),

        addLeadRemark: builder.mutation({
            query: ({ leadId, remark }) => ({
                url: `/admin/lead/${leadId}/remarks`,
                method: "POST",
                body: { remark },
            }),
            invalidatesTags: (result, error, { leadId }) => [{ type: "LeadRemarks", id: leadId }],
        }),
        // getRemarks: builder.query({
        //     query: (leadId) => `/admin/leads/${leadId}/remarks`, // Adjust URL if needed
        // }),
        // addRemark: builder.mutation({
        //     query: ({ id, message }) => ({
        //         url: `/admin/leads/${id}/remark`,
        //         method: "POST",
        //         body: { message },
        //     }),
        // }),
        closeLead: builder.mutation({
            query: (id) => ({
                url: `/admin/leads/${id}/close`,
                method: "PUT",
            }),
        }),
        convertLead: builder.mutation({
            query: ({ id, data }) => ({
                url: `/admin/leads/${id}/convert`,
                method: "POST",
                body: data,
            }),
        }),
        updateLead: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/admin/leads/${id}`,
                method: "PUT",
                body: data,
            }),
        }),
    }),
});

export const {
    useGetLeadsQuery,
    useGetLeadByIdQuery,
    useCloseLeadMutation,
    useConvertLeadMutation,
    useAddLeadMutation,
    useGetLeadRemarksQuery,
    useAddLeadRemarkMutation,
    useUpdateLeadMutation,
} = leadApi;
