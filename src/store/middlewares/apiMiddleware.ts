import { Middleware, ThunkDispatch, AnyAction } from '@reduxjs/toolkit';
import { refreshAccessToken } from '../thunks/authThunks';
import { RootState } from '../store';

const apiMiddleware: Middleware = ({ dispatch, getState }) => (next) => async (action) => {
  const thunkDispatch = dispatch as ThunkDispatch<RootState, undefined, AnyAction>;

  const result = next(action);

  if (action.type.endsWith('/rejected') && action.error.message === 'Access token expired') {
    const refreshResult = await thunkDispatch(refreshAccessToken());
    if (refreshResult.type.endsWith('/fulfilled')) {
      return next(action);
    }
  }

  return result;
};

export default apiMiddleware;