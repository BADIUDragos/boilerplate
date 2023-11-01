import { FetchBaseQueryError, createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from "../../functions/baseQueries";
import { LoginCredentials, LoginResultData } from "../interfaces/authInterfaces";
import { SerializedError } from '@reduxjs/toolkit';

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQuery,
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