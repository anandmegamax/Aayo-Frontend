import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: true,
}
export const userSlice = createSlice({
    initialState,
    name: "userSlice",
    reducers: {
        setUser(state, action) {
            const user = action.payload;
            state.user = {
                ...user,
                permissions: user?.role?.permissions?.map((p) => p.action) || [],
            };
            state.isAuthenticated = true;
            //state.user = action.payload;
        },
        setIsAuthenticated(state, action) {
            state.isAuthenticated = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        clearUser(state) {
            state.user = null;
            state.isAuthenticated = false;
        },
    }
});

export default userSlice.reducer;

export const { setIsAuthenticated, setUser, setLoading, clearUser } = userSlice.actions