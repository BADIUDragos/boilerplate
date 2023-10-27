import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DecodedTokenState } from '../interfaces/authInterfaces'


const initialState: DecodedTokenState = {
  id: null,
  username: null,
  permissions: null,
};

const decodedTokenSlice = createSlice({
  name: 'decodedToken',
  initialState,
  reducers: {
    setDecodedTokenInfo(state, action: PayloadAction<DecodedTokenState>) {
      return action.payload;
    },
  },
});

export const { setDecodedTokenInfo } = decodedTokenSlice.actions;
export default decodedTokenSlice.reducer;