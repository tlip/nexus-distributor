import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { OpportunityShell } from 'types/shared';
import { fetchAllRates } from '../client';

export const fetchRates = createAsyncThunk('user/fetchSecret', async () => {
  const rates = await fetchAllRates();
  return rates;
});

// @ts-ignore
export const application = createSlice({
  name: 'application',
  initialState: {
    rates: [] as OpportunityShell[],
  },
  reducers: {},
  extraReducers: {
    // @ts-ignore
    [fetchRates.fulfilled]: (state, action) => {
      state.rates = action.payload;
    },
  },
});

export default application.reducer;
