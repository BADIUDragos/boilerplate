import { configureStore, ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { authApi, useLoginMutation } from "./apis/authApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

const preloadedState = {
  auth: {
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem("refreshToken"),
    decodedAccessTokenInfo: JSON.parse(
      localStorage.getItem("decodedAccessTokenInfo") || "null"
    ),
  },
};

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
  preloadedState: preloadedState,
  devTools: true,
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;

export { useLoginMutation };

export default store;
