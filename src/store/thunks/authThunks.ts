import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { AuthState } from '../interfaces/authInterfaces'

export const refreshAccessToken = createAsyncThunk(
  'auth/refreshAccessToken',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as { auth: AuthState };
    try {
      const response = await axios.post('/token/refresh', {
        refresh: state.auth.refreshToken,
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }: { username: string; password: string }) => {
    const response = await axios.post('/token', { username, password });
    return response.data;
  }
);