export const formatPrice = (price) => {
  return new Intl.NumberFormat("sv-SE").format(price) + " kr";
};
