import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
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

export const baseQueryWithReauth = async (
  args: any,
  api: any,
  extraOptions: any
) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        console.log("sending refresh token");
        const refreshResult = await baseQuery(
          { url: `${API_URL}/auth/token/refresh` },
          api,
          extraOptions
        );
        console.log(refreshResult);

        if (refreshResult?.data) {
          const data = refreshResult.data as LoginResultData;
          const newAccessToken = data.access;
          const userInfo = decodeTokenAndSetDecodedInfo(newAccessToken);

          if (newAccessToken && userInfo) {
            api.dispatch(
              setCredentials({
                accessToken: newAccessToken,
                refreshToken: data.refresh,
                userInfo,
              })
            );
          } else {
            api.dispatch(logOut());
          }
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

  return result;
};
