export const parsePrice = (priceString) => {
  // Parses the price string to a number. Adjust the implementation if your data format differs.
  const price = parseFloat(priceString);
  if (isNaN(price)) {
    console.error("Invalid price format:", priceString);
    return 0;
  }
  return price;
};
