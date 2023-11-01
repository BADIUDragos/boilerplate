import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, DecodedTokenState } from "../interfaces/authInterfaces";

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  decodedAccessTokenInfo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken: string;
        decodedAccessTokenInfo: DecodedTokenState | null;
      }>
    ) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.decodedAccessTokenInfo = action.payload.decodedAccessTokenInfo;
    },
    logOut(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.decodedAccessTokenInfo = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;
