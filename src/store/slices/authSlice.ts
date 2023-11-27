import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, TokensResultData } from "../interfaces/authInterfaces";
import { decodeTokenAndSetUserInfo } from "../../functions/decoding";

const tokensInitialState: TokensResultData = {
  access: localStorage.getItem("accessToken") || "",
  refresh: localStorage.getItem("refreshToken") || "",
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
      }>
    ) {
      state.tokens = action.payload.tokens;
      state.userInfo = decodeTokenAndSetUserInfo(state.tokens.access)
      localStorage.setItem("accessToken", state.tokens.access);
      localStorage.setItem("refreshToken", state.tokens.refresh);
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
