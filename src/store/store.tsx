import { configureStore, ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import apiMiddleware from "./middlewares/apiMiddleware";

const store = configureStore({
  reducer: {
    auth: authReducer,
    // ... other reducers
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiMiddleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;

export default store;
