export const getQueryObject = (
  encodedQuery?: string
): { [key: string]: string } => {
  if (!encodedQuery) {
    return {};
  }

  const queryObj: { [key: string]: string } = {};
  const queryArr = encodedQuery
    .slice(1)
    .split('&')
    .map((q: string) => q.split('='));

  queryArr.forEach(([key, value]) => {
    queryObj[key] = decodeURIComponent(value.replace(/\+/g, '%20'));
  });

  return queryObj;
};
