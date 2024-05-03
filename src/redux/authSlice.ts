import { createSlice } from '@reduxjs/toolkit';
import api from './api';

function storeToken(state: any, { payload }: { payload: { token: string } }) {
    //check token 
    state.token = payload.token;
    window.sessionStorage.setItem("token", payload.token);
}
// Create a Redux slice for authentication
const authSlice = createSlice({
    name: "auth",
    initialState: { token: window.sessionStorage.getItem("token") ?? null },
    reducers: {},

    extraReducers: (builder) => {
        builder.addMatcher(
            api.endpoints.register.matchFulfilled, storeToken);

        builder.addMatcher(
            api.endpoints.login.matchFulfilled, storeToken);
    }
});

export default authSlice.reducer;