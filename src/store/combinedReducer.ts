import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { authApi } from './apis/authApi';

export const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;