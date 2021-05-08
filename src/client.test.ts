import { fetchCompoundRates, fetchAaveRates } from 'client';

describe('Client tests', () => {
  it('fetchCompoundRates should work', async () => {
    const result = await fetchCompoundRates();
    expect(result).toBeTruthy();
  });

  it('fetchAaveRates should work', async () => {
    const result = await fetchAaveRates();
    expect(result).toBeTruthy();
  });
});
