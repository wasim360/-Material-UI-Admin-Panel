import { api } from "Utils/http";

export const authUserApi = api.injectEndpoints({
  endpoints: (build) => ({
    createUser: build.mutation<any, Partial<any>>({
      query(body) {
        return {
          url: `/auth/signup`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["auth_user"],
    }),
    getUserById: build.query<any, number>({
      query: (id) => `/auth/user_detail/${id}`,
      providesTags: (_result, _err, id) => [{ type: "auth_user", id }],
      // transformResponse: (response) => {
      //   return response;
      // },
      extraOptions: { maxRetries: 1 },
    }),

    getAllUsers: build.query<any, void>({
      query: () => ({
        url: "/auth/users/manage",
      }),
      extraOptions: { maxRetries: 2 },

      providesTags: ["auth_user"],
    }),
    uploadingImage: build.mutation<any, Partial<any>>({
      query: (payload) => {
        return {
          url: `/auth/image_upload`,
          method: "PATCH",
          body: payload,
        };
      },
    }),

    updateUser: build.mutation<any, Partial<any>>({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `/auth/update/${id}`,
          method: "PATCH",
          body,
        };
      },
      invalidatesTags: (auth) => [{ type: "auth_user", id: auth?.id }],
    }),
    deleteUser: build.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `/auth/delete/${id}`,
          method: "DELETE",
          extraOptions: { maxRetries: 0 },
        };
      },
      invalidatesTags: (auth) => [{ type: "auth_user", id: auth?.id }],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useUpdateUserMutation,
  useGetUserByIdQuery,
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useUploadingImageMutation,
} = authUserApi;
