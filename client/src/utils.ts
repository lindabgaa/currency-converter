export const formatNumber = (number: number, decimalPlaces: number = 2) => {
  const parts = number.toFixed(decimalPlaces).split("."); // Split the number into integer and decimal parts
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " "); // Add space before every 3 digits
  return parts.join(","); // Join the parts back together with a comma
};
