/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { fetchRates as fetchRatesAction } from './reducer';
import { OpportunityShell } from 'types/shared';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAsyncRates = () => {
  const dispatch = useAppDispatch();
  const rates: OpportunityShell[] = useAppSelector(
    (state) => state.application.rates
  );
  const fetchRates = () => dispatch(fetchRatesAction());
  return [rates, fetchRates] as const;
};
