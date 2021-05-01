import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllRates } from '../client';

export const fetchRates = createAsyncThunk('user/fetchSecret', async () =>
  fetchAllRates()
);

// @ts-ignore
export const app = createSlice({
  name: 'app',
  initialState: {
    rates: {} as any,
  },
  reducers: {},
  extraReducers: {
    // @ts-ignore
    [fetchSecret.fulfilled]: (state, action) => {
      state.rates = action.payload;
    },
  },
});

export default app.reducer;
