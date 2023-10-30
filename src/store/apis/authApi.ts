import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from "../../functions/baseQueries";
import { LoginCredentials, LoginResultData } from "../interfaces/authInterfaces";

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    login: build.mutation<LoginResultData, LoginCredentials>({
      query: (credentials: LoginCredentials) => ({
        url: '/auth/token',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
export { authApi }