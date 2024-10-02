import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state, action) => {
            state.loading = true;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload
            state.error = null;
            state.loading = false;
        },
        signInFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false
        },
        updateStart: (state, action) => {
            state.loading = true;
        },
        updateSuccess: (state, action) => {
            state.currentUser = action.payload
            state.error = null;
            state.loading = false;
        },
        updateFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false
        },
        deleteUserStart: (state, action) => {
            state.loading = true;
        },
        deleteUserSuccess: (state, action) => {
            state.currentUser = action.payload
            state.error = null;
            state.loading = false;
        },
        deleteUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false
        }
    }
});

export const { signInFailure, signInStart, signInSuccess, updateFailure, updateStart, updateSuccess, deleteUserFailure, deleteUserStart, deleteUserSuccess } = userSlice.actions;
export default userSlice.reducer;