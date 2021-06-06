const UNITS = ['', 'k', 'm', 'b', 't'];

export const abbreviateNumber = (
  n: number,
  opts: Intl.NumberFormatOptions = {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }
): string => {
  if (!n && n != 0) return '0.00';

  let _n = n;
  let thousands = 0;
  while (_n > 1000) {
    _n /= 1000;
    thousands++;
  }

  return `${_n.toLocaleString(undefined, opts)}${UNITS[thousands]}`;
};
