import { api } from 'Utils/http';

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    LoginAPI: build.mutation<any, Partial<any>>({
      query(body) {
        return {
          url: `/auth/login`,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['activity'],
    }),
    ForgotPassword: build.mutation<any, Partial<any>>({
      query(body) {
        return {
          url: `/auth/forgot_password`,
          method: 'POST',
          body,
        };
      },
    }),
    RegisterAPI: build.mutation<any, Partial<any>>({
      query(body) {
        return {
          url: `auth/register`,
          method: 'POST',
          body,
        };
      },
    }),
    resetPassword: build.mutation<any, Partial<any>>({
      query(body) {
        return {
          url: `/auth/reset_password`,
          method: 'PATCH',
          password: body?.confrim_password,
          headers: {
            Authorization: 'Bearer ' + body.authToken,
          },
        };
      },
    }),
    getValidateToken: build.query<any, void>({
      query(authToken) {
        return {
          url: `/auth/validate_token/${authToken}`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const {
  useLoginAPIMutation,
  useForgotPasswordMutation,
  useGetValidateTokenQuery,
  useRegisterAPIMutation,
  useLazyGetValidateTokenQuery,
  useResetPasswordMutation,
} = authApi;
