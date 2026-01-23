
export const saveCartToStorage = (cartItems) => {
  localStorage.setItem('cart', JSON.stringify(cartItems));
};


export const loadCartFromStorage = () => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};


export const clearCartStorage = () => {
  localStorage.removeItem('cart');
};
