import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logOut } from '../auth/authSlice'
import { RootState } from '../store';
import { RefreshResultData } from '../interfaces/authInterfaces'
import { decodeTokenAndSetDecodedInfo } from '../functions/decoding';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3500',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
    headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    console.log('sending refresh token');
    const refreshResult = await baseQuery({ url: '/refresh' }, api, extraOptions);
    console.log(refreshResult);
    
    if (refreshResult?.data) {
      const data = refreshResult.data as RefreshResultData;
      const newAccessToken = data.accessToken;
      const decodedAccessTokenInfo = decodeTokenAndSetDecodedInfo(newAccessToken);

      if (newAccessToken && decodedAccessTokenInfo) {
        api.dispatch(setCredentials({ 
          accessToken: newAccessToken, 
          refreshToken: data.refreshToken, 
          decodedAccessTokenInfo 
        }));
        } else {
          api.dispatch(logOut());
      }
  } else {
      api.dispatch(logOut());
  }
  }

  return result;
};

export const baseApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({})
});