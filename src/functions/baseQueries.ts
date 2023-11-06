import {
  BaseQueryApi,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../store/slices/authSlice";
import { RootState } from "../store";
import { LoginResultData } from "../store/interfaces/authInterfaces";
import { decodeTokenAndSetDecodedInfo } from "./decoding";
import { API_URL } from "../constants/urls";
import { Mutex } from "async-mutex";

const mutex = new Mutex();

export const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    console.log("sending refresh token");
    const refreshResult = await baseQuery(
      {
        url: `${API_URL}/auth/token/refresh`,
        method: "POST",
        body: {
          refresh: localStorage.getItem("refreshToken") || "", 
        },
      },
      api,
      extraOptions
    );
    console.log(refreshResult);

    if (refreshResult?.data) {
      const data = refreshResult.data as LoginResultData;
      const newAccessToken = data.access;
      const newRefreshToken = data.refresh;
      const userInfo = decodeTokenAndSetDecodedInfo(newAccessToken);

      if (newAccessToken && userInfo) {
        api.dispatch(
          setCredentials({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
            userInfo,
          })
        );
      } else {
        api.dispatch(logOut());
      }
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};
