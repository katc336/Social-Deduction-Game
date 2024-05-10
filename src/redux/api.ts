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
        //GET SINGLE GAME
        getSingleGame: builder.query({
            query: (id) => ({
                url: `/api/my_game/${id}`,
                method: 'GET',
            }),
            providesTags: ["Game"]
        }),
        //GET ALL GAMES
        getAllGames: builder.query({
            query: (id) => ({
                url: `/api/my_games`,
                method: 'GET',
            }),
            providesTags: ["Game"]
        }),
        //DELETE SINGLE GAME
        deleteGame: builder.mutation({
            query: (gameId) => ({
                url: `/api/my_game/${gameId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Game"]
        }),
        //ADD ROLES
        addNewRoles: builder.mutation({
            query: (name) => ({
                url: `/api/add_roles`,
                method: 'POST',
                body: name
            }),
            invalidatesTags: ["Game"]
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
    useGetSingleGameQuery,
    //Get Game(s)
    useGetAllGamesQuery,
    //Delet Game
    useDeleteGameMutation,
    //Add new role
    useAddNewRolesMutation
} = api;

