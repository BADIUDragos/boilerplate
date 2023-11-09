import { configureStore, ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { authApi, useLoginMutation, useBlacklistMutation } from "./apis/authApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
  devTools: true,
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;

export { useLoginMutation, useBlacklistMutation };

export default store;
