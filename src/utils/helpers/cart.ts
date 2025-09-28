export const calculateItemTotalPrice = (price: number, quantity: number): number => {
  return Number((price * quantity).toFixed(2));
};