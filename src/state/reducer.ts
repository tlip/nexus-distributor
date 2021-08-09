import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Transaction } from 'ethers';
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
    capacities: [] as any[],
    signedQuote: undefined,
    loadingRates: false,
    loadingCapacities: false,
    transactions: [] as Transaction[],
    transactionError: '' as string,
  },
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.push(action.payload);
    },
    setTransactionError: (state, action: PayloadAction<any>) => {
      state.transactionError = action.payload;
    },
  },
  extraReducers: {
    // @ts-ignore
    [fetchRates.fulfilled]: (state, action) => {
      state.rates = action.payload;
    },
    // @ts-ignore
    [fetchCapacities.pending]: (state) => {
      state.loadingCapacities = true;
    },
    // @ts-ignore
    [fetchRates.pending]: (state) => {
      state.loadingRates = true;
    },
    // @ts-ignore
    [fetchCapacities.fulfilled]: (state, action) => {
      state.capacities = action.payload;
    },
    // @ts-ignore
    [fetchSignedQuote.fulfilled]: (state, action) => {
      state.signedQuote = action.payload;
    },
  },
});

export const { addTransaction, setTransactionError } = application.actions;
export default application.reducer;
