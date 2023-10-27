import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthState } from '../interfaces/authInterfaces'
import { refreshAccessToken, login } from '../thunks/authThunks';

import { decodeTokenAndSetDecodedInfo } from '../functions/decoding';  // adjust the import path


const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  decodedAccessTokenInfo: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens(state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.decodedAccessTokenInfo = decodeTokenAndSetDecodedInfo(action.payload.accessToken);
    },
    // ... other reducers
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.accessToken = action.payload.access;
      state.refreshToken = action.payload.refresh;
      state.decodedAccessTokenInfo = decodeTokenAndSetDecodedInfo(action.payload.access);
    });
    builder.addCase(refreshAccessToken.fulfilled, (state, action) => {
      state.accessToken = action.payload.access;
      state.decodedAccessTokenInfo = decodeTokenAndSetDecodedInfo(action.payload.accessToken);
    });
  },
});

export const { setTokens } = authSlice.actions;
export default authSlice.reducer;