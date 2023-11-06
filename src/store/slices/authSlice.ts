import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, DecodedTokenState } from "../interfaces/authInterfaces";

const initialState: AuthState = {
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")!) : null
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
        userInfo: DecodedTokenState | null;
      }>
    ) {
      const { accessToken, refreshToken, userInfo } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.userInfo = userInfo;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    },
    logOut(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.userInfo = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;
