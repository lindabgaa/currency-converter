export const formatNumber = (number: number, decimalPlaces: number = 2) => {
  return number.toLocaleString(undefined, {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  });
};
