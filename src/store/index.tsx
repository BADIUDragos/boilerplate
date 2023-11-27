import { configureStore, ThunkDispatch, AnyAction } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { rootReducer, RootState } from './combinedReducer';
import { authApi, useBlacklistMutation, useLoginMutation } from './apis/authApi';


const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
  devTools: true,
});

setupListeners(store.dispatch);

export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;
export type { RootState }

export { useLoginMutation, useBlacklistMutation };

export default store;
