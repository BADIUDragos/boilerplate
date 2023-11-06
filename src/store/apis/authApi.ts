import {
  LoginCredentials,
  LoginResultData,
} from "../interfaces/authInterfaces";
import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResultData, LoginCredentials>({
      query: (credentials: LoginCredentials) => ({
        url: "/auth/token",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
export { authApi };
