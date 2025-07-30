import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { setIsAuthenticated, setLoading, setUser } from "../features/userSlice";

export const adminApi = createApi({
    reducerPath: "adminApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/v1"
    }),
    tagTypes: ["User"],
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => "/admin/users",
            providesTags: ["Users"],
        }),
        updateUserRole: builder.mutation({
            query: ({ id, role }) => ({
                url: `/admin/user/${id}`,
                method: "PUT",
                body: { role },
            }),
            invalidatesTags: ["Users"],
        }),
        getRoles: builder.query({
            query: () => "/admin/roles",
            providesTags: ["Roles"],
        }),
        getMenus: builder.query({
            query: () => "/admin/menus",
        }),
        createMenu: builder.mutation({
            query: (m) => ({
                url: `/admin/menu/create`,
                method: "POST",
                body: m,
            }),
            invalidatesTags: ["Menu"]
        }),
        getPermissions: builder.query({
            query: () => "/admin/permissions",
        }),
        createPermission: builder.mutation({
            query: (p) => ({
                url: `/admin/permission/create`,
                method: "POST",
                body: p,
            }),
            invalidatesTags: ["Permission"]
        }),
        // getRoles: builder.query({
        //     query: () => "/admin/roles",
        // }),
        createRole: builder.mutation({
            query: (r) => ({
                url: `/admin/role/create`,
                method: "POST",
                body: r,
            }),
            invalidatesTags: ["Role"]
        }),
        updateRolePermissions: builder.mutation({
            query: ({ id, permissions }) => ({
                url: `/admin/role/update/${id}`,
                method: "PUT",
                body: { permissions },
            }),
        }),
        updateUserDetails: builder.mutation({
            query: ({ id, data }) => ({
                url: `/admin/user/${id}`,
                method: "PUT",
                body: data,
            }),
        }),
    })
})

export const { useGetUsersQuery, useUpdateUserRoleMutation, useGetRolesQuery, useCreateMenuMutation, useGetMenusQuery, useCreatePermissionMutation, useGetPermissionsQuery, useCreateRoleMutation, useUpdateRolePermissionsMutation, useUpdateUserDetailsMutation } = adminApi;