import {
  LoginCredentials,
  LoginResultData,
} from "../interfaces/authInterfaces";
import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResultData, LoginCredentials>({
      query: (credentials) => ({
        url: "/auth/token",
        method: "POST",
        body: credentials,
      }),
      extraOptions: {
        onSuccess: (data: any, arg: any, context: any) => {
          // Handle success here
        },
        onError: (error: any, arg: any, context: any) => {
          // Handle failure here
        },
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
export { authApi };
