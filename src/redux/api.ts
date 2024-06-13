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
                url: `/auth/sign_up`,
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
            query: () => ({
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
        //GET ALL ROLES
        getAllRoles: builder.query({
            query: (id) => ({
                url: `/api/roles`,
                method: 'GET',
            }),
            providesTags: ["Role"]
        }),
        //DELETE ROLE
        deleteRole: builder.mutation({
            query: (roleId) => ({
                url: `/api/role/${roleId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Game"]
        }),
        //ADD PLAYER ROLE
        addNewPlayer: builder.mutation({
            query: ({ name, gameId, roleId }) => ({
                url: `/api/add_player`,
                method: 'POST',
                body: { name, gameId, roleId }
            }),
            invalidatesTags: ["Game"]
        }),
        //UPDATE PLAYER
        updatePlayer: builder.mutation({
            query: ({ playerId, name, roleName, gameId }) => ({
                url: `/api/player/${playerId}`,
                method: 'PATCH',
                body: { name, roleName, gameId }
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
    //Add New Role
    useAddNewRolesMutation,
    //Get All Roles
    useGetAllRolesQuery,
    //Delete Role
    useDeleteRoleMutation,
    //Add player
    useAddNewPlayerMutation,
    //Update player (name and role)
    useUpdatePlayerMutation
} = api;

