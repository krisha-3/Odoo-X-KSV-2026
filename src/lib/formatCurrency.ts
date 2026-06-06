/**
 * Format number as Indian Rupee currency
 *
 * Example:
 * 1250000 => ₹12,50,000
 */
export const formatCurrency = (
  amount: number,
  showSymbol: boolean = true
): string => {
  const formattedAmount = new Intl.NumberFormat(
    "en-IN",
    {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }
  ).format(amount);

  return showSymbol
    ? `₹${formattedAmount}`
    : formattedAmount;
};

/**
 * Format amount with fixed decimals
 *
 * Example:
 * 1250000.5 => ₹12,50,000.50
 */
export const formatCurrencyWithDecimals = (
  amount: number
): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Compact currency format
 *
 * Example:
 * 1250000 => ₹12.5L
 * 15000000 => ₹1.5Cr
 */
export const formatCompactCurrency = (
  amount: number
): string => {
  if (amount >= 10000000) {
    return `₹${(
      amount / 10000000
    ).toFixed(1)}Cr`;
  }

  if (amount >= 100000) {
    return `₹${(
      amount / 100000
    ).toFixed(1)}L`;
  }

  return formatCurrency(amount);
};