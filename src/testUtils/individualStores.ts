import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authApi } from "../store/apis/authApi";
import authReducer from "../store/slices/authSlice";

const authStore = configureStore({
  reducer: combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export { authStore }