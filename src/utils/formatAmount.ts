/**
 * Formats a number as a currency value in USD.
 *
 * @param value - The number to format.
 * @returns The formatted currency value.
 */

export const format = (value: number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(value);
};
