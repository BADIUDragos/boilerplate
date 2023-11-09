import { decodeTokenAndSetDecodedInfo } from "../../functions/decoding";
import {
  BlacklistingRefresh,
  LoginCredentials,
  LoginResultData,
} from "../interfaces/authInterfaces";
import { logOut, setCredentials } from "../slices/authSlice";
import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  
  endpoints: (build) => ({
    login: build.mutation<LoginResultData, LoginCredentials>({
      query: (credentials) => ({
        url: "/auth/token",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const userInfo = decodeTokenAndSetDecodedInfo(data.access);
          dispatch(setCredentials({
            tokens: { access: data.access, refresh: data.refresh },
            userInfo: userInfo,
          }));
        } catch (error: any) {
        }
      },
    }),
    blacklist: build.mutation<void, BlacklistingRefresh>({
      query: (tokens) => ({
        url: "/auth/token/blacklist",
        method: "POST",
        body: tokens,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          console.log("request was made")
          dispatch(logOut());
        } catch (error: any) {}
      },
    }),
  }),
});

export const { useLoginMutation, useBlacklistMutation } = authApi;
export { authApi };
