import { decodeTokenAndSetUserInfo } from "../../functions/decoding";
import { BasicResponse } from "../errorHandling/basicError";
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
          const userInfo = data.access ? decodeTokenAndSetUserInfo(data.access) : null;
          dispatch(setCredentials({
            tokens: { access: data.access, refresh: data.refresh },
            userInfo: userInfo,
          }));
        } catch (error: any) {
        }
      },
    }),
    blacklist: build.mutation<BasicResponse, BlacklistingRefresh>({
      query: (refresh) => ({
        url: "/auth/token/blacklist",
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
