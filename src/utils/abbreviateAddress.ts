export const abbreviateAddress = (address: string, num = 3): string => {
  if (!address) return '';
  return `${address.substring(0, num + 2)}...${address.substring(
    address.length - num - 1
  )}`;
};
