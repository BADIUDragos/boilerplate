import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logOut } from '../store/slices/authSlice'
import { RootState } from '../store/store';
import { LoginResultData } from '../store/interfaces/authInterfaces'
import { decodeTokenAndSetDecodedInfo } from './decoding';
import { API_URL } from '../constants/urls';

export const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
    headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    console.log('sending refresh token');
    const refreshResult = await baseQuery({ url: `${API_URL}/auth/token/refresh` }, api, extraOptions);
    console.log(refreshResult);
    
    if (refreshResult?.data) {
      const data = refreshResult.data as LoginResultData;
      const newAccessToken = data.access;
      const decodedAccessTokenInfo = decodeTokenAndSetDecodedInfo(newAccessToken);

      if (newAccessToken && decodedAccessTokenInfo) {
        api.dispatch(setCredentials({ 
          accessToken: newAccessToken, 
          refreshToken: data.refresh, 
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
