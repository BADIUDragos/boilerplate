import { decodeTokenAndSetDecodedInfo } from "../../functions/decoding";
import { BasicResponse } from "../errorHandling/basicError";
import {
  BlacklistingRefresh,
  LoginCredentials,
  LoginResultData,
} from "../interfaces/authInterfaces";
import { setCredentials } from "../slices/authSlice";
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
    blacklist: build.mutation<BasicResponse, BlacklistingRefresh>({
      query: (refresh) => ({
        url: "/auth/token/blacklist",
        method: "POST",
        body: refresh,
      }),
    }),
  }),
});

export const { useLoginMutation, useBlacklistMutation } = authApi;
export { authApi };
