import {
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
import { isTokenInvalidError } from "./typeGuards/isTokenInvalidError";
import { isTokenBlacklistedError } from "./typeGuards/isTokenBlacklistedError";

const mutex = new Mutex();

export const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.tokens?.access;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    const isBlacklisting = (api.getState() as RootState).auth.isBlacklistingToken;
    if (isTokenBlacklistedError(result.error)) {
      api.dispatch(logOut());
      return result;
    } else if (isBlacklisting && isTokenInvalidError(result.error)) {
      api.dispatch(logOut());
      return result;
    } else if (isTokenInvalidError(result.error)) {
      
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();
        try {
          const refreshResult = await baseQuery({
            url: '/auth/token/refresh',
            method: 'POST',
            body: {
              refresh: localStorage.getItem('refreshToken') || '',
            },
          }, api, extraOptions);

          if (refreshResult.data) {
            const data = refreshResult.data as LoginResultData;
            api.dispatch(setCredentials({
              tokens: {
                access: data.access,
                refresh: data.refresh,
              },
              userInfo: decodeTokenAndSetDecodedInfo(data.access),
            }));
            result = await baseQuery(args, api, extraOptions);
          } else {
            api.dispatch(logOut());
          }
        } finally {
          release();
        }
      } else {
        await mutex.waitForUnlock();
        result = await baseQuery(args, api, extraOptions);
      }
    }
  }

  return result;
};
