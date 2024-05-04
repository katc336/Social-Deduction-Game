import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const backendURL = "/";

const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: backendURL,
        prepareHeaders: (headers: Headers, args: { getState: any }) => {
            const token = args.getState().auth.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["User", "Game", "Role", "Player"] as const,

    endpoints: (builder) => ({
        // AUTHORIZATION
        register: builder.mutation({
            query: (user: any) => ({
                url: `/auth/register`,
                method: 'POST',
                body: user,
            }),
        }),
        login: builder.mutation({
            query: (user: any) => ({
                url: `/auth/login`,
                method: 'POST',
                body: user,
            }),
        }),
        // GET USER INFO
        getUser: builder.query({
            query: () => ({
                url: `/auth/account`,
                method: 'GET',
            }),
            providesTags: ["User"]
        }),
        // NEW GAME
        addNewGame: builder.mutation({
            query: (name) => ({
                url: `/api/add_game`,
                method: 'POST',
                body: name 
            }),
            invalidatesTags: ["Game"]
        }),
        // GET SINGLE GAME
        getSingleGame: builder.query({
            query: (id) => ({
                url: `/api/my_game/${id}`,
                method: 'GET',
            }),
            providesTags: ["Game"]
        }),
    })
});
export default api;
export const {
    // Authorization
    useRegisterMutation,
    useLoginMutation,
    // User Information
    useGetUserQuery,
    //New Game
    useAddNewGameMutation,
    //Get Single Game
    useGetSingleGameQuery
} = api;

