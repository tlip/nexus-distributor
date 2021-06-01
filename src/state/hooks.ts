/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import {
  fetchRates as fetchRatesAction,
  fetchCapacities as fetchCapacitiesAction,
  fetchSignedQuote as fetchSignedQuoteAction,
} from './reducer';
import { OpportunityShell } from 'types/shared';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAsyncRates = () => {
  const dispatch = useAppDispatch();
  const rates: OpportunityShell[] = useAppSelector(
    (state) => state.application.rates
  );
  const loadingRates = useAppSelector(
    (state) => state.application.loadingRates
  );
  const fetchRates = () => dispatch(fetchRatesAction());
  return [rates, fetchRates, loadingRates] as const;
};

export const useAsyncCapacities = () => {
  const dispatch = useAppDispatch();
  const capacities: any[] = useAppSelector(
    (state) => state.application.capacities
  );
  const fetchCapacities = () => dispatch(fetchCapacitiesAction());
  const loadingCapacities = useAppSelector(
    (state) => state.application.loadingCapacities
  );
  return [capacities, fetchCapacities, loadingCapacities] as const;
};

export const useAsyncSignedQuote = () => {
  const dispatch = useAppDispatch();
  const signedQuote: any = useAppSelector(
    (state) => state.application.signedQuote
  );
  const fetchSignedQuote = (contractAddress: string) =>
    dispatch(fetchSignedQuoteAction(contractAddress));
  return [signedQuote, fetchSignedQuote] as const;
};
