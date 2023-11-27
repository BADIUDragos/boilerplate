import { decodeTokenAndSetUserInfo } from "../../functions/decoding";
import { BasicResponse } from "../errorHandling/basicError";
import {
  BlacklistingRefresh,
  LoginCredentials,
  TokensResultData,
} from "../interfaces/authInterfaces";
import { logOut, setCredentials } from "../slices/authSlice";
import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  
  endpoints: (build) => ({
    login: build.mutation<TokensResultData, LoginCredentials>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials({
            tokens: { access: data.access, refresh: data.refresh }
          }));
        } catch (error: any) {
        }
      },
    }),
    blacklist: build.mutation<BasicResponse, BlacklistingRefresh>({
      query: (refresh) => ({
        url: "/auth/logout",
        method: "POST",
        body: refresh,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logOut());
        } catch (error) {
        }
      },
    }),
  }),
});

export const { useLoginMutation, useBlacklistMutation } = authApi;
export { authApi };
