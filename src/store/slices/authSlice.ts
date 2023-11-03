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
      const { accessToken, refreshToken, decodedAccessTokenInfo } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.decodedAccessTokenInfo = decodedAccessTokenInfo;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem('decodedAccessTokenInfo', JSON.stringify(decodedAccessTokenInfo));
    },
    logOut(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.decodedAccessTokenInfo = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("decodedAccessTokenInfo");
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;
