import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, TokensResultData, UserInfoState } from "../interfaces/authInterfaces";
import { decodeTokenAndSetUserInfo } from "../../functions/decoding";

const tokensInitialState: TokensResultData = {
  access: localStorage.getItem("accessToken") || null,
  refresh: localStorage.getItem("refreshToken") || null,
}

const initialState: AuthState = {
  tokens: tokensInitialState || null,
  userInfo: tokensInitialState.access ? decodeTokenAndSetUserInfo(tokensInitialState.access) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(
      state,
      action: PayloadAction<{
        tokens: TokensResultData;
        userInfo: UserInfoState | null;
      }>
    ) {
      state.tokens = action.payload.tokens;
      state.userInfo = action.payload.userInfo;
      if (action.payload.tokens.access && action.payload.tokens.refresh) {
        localStorage.setItem("accessToken", action.payload.tokens.access);
        localStorage.setItem("refreshToken", action.payload.tokens.refresh);
      }      
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
