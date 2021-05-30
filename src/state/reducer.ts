import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { OpportunityShell } from 'types/shared';
import {
  fetchAllRates,
  fetchCapacities as fetchCoverageData,
  fetchSignedQuote as fetchQuote,
} from '../client';

export const fetchRates = createAsyncThunk('app/fetchSecret', async () => {
  const rates = await fetchAllRates();
  return rates;
});

export const fetchCapacities = createAsyncThunk(
  'app/fetchCapacities',
  async () => {
    const capacities = await fetchCoverageData();
    return capacities;
  }
);

export const fetchSignedQuote = createAsyncThunk(
  'app/fetchSignedQuote',
  async (contractAddress: string) => {
    const quote = await fetchQuote(1, 'ETH', 100, contractAddress);
    return quote;
  }
);

// @ts-ignore
export const application = createSlice({
  name: 'application',
  initialState: {
    rates: [] as OpportunityShell[],
    capaicites: [] as any[],
    signedQuote: undefined,
  },
  reducers: {},
  extraReducers: {
    // @ts-ignore
    [fetchRates.fulfilled]: (state, action) => {
      state.rates = action.payload;
    },
    // @ts-ignore
    [fetchCapacities.fulfilled]: (state, action) => {
      state.capaicites = action.payload;
    },
    // @ts-ignore
    [fetchSignedQuote.fulfilled]: (state, action) => {
      state.signedQuote = action.payload;
    },
  },
});

export default application.reducer;
