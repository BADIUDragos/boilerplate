import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, LoginResultData, UserInfoState } from "../interfaces/authInterfaces";
import { decodeTokenAndSetDecodedInfo } from "../../functions/decoding";

const tokensInitialState: LoginResultData = {
  access: localStorage.getItem("accessToken") || "null",
  refresh: localStorage.getItem("refreshToken") || "null",
}

const initialState: AuthState = {
  tokens: tokensInitialState || null,
  userInfo: decodeTokenAndSetDecodedInfo(tokensInitialState.access)
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(
      state,
      action: PayloadAction<{
        tokens: LoginResultData;
        userInfo: UserInfoState | null;
      }>
    ) {
      state.tokens = action.payload.tokens;
      state.userInfo = action.payload.userInfo;
      localStorage.setItem("accessToken", action.payload.tokens.access);
      localStorage.setItem("refreshToken", action.payload.tokens.refresh);
    },
    logOut(state) {
      state.tokens = null;
      state.userInfo = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;
