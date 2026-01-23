import { createSlice } from '@reduxjs/toolkit';

const saveCartToStorage = (items) => {
  localStorage.setItem('cart', JSON.stringify(items));
};

const loadCartFromStorage = () => {
  try {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  } catch {
    return [];
  }
};

const clearCartStorage = () => {
  localStorage.removeItem('cart');
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], 
    total: 0
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.items.find(cartItem => cartItem.id === item.id);
      
      if (existing) {
        existing.quantity += (item.quantity || 1);
      } else {
        state.items.push({
             ...item,
              quantity: item.quantity || 1 });
      }
      
      
      state.total = state.items.reduce((acc, cartItem) => 
        acc + (cartItem.price * cartItem.quantity), 0
      );
      
      saveCartToStorage(state.items); 
    },
    
    removeFromCart: (state, action) => {
      const id = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        state.items = state.items.filter(item => item.id !== id);
        
        state.total = state.items.reduce((acc, cartItem) => 
          acc + (cartItem.price * cartItem.quantity), 0
        );
      }
      saveCartToStorage(state.items); 
    },
    
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
        
        state.total = state.items.reduce((acc, cartItem) => 
          acc + (cartItem.price * cartItem.quantity), 0
        );
      }
      saveCartToStorage(state.items); 
    },
    
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      clearCartStorage(); 
    },
    
    
    loadCart: (state, action) => {
    state.items = action.payload; 
    state.total = action.payload.reduce((acc, item) => 
        acc + (item.price * (item.quantity || 1)), 0
    );
    saveCartToStorage(state.items);
    }

  }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, loadCart } = cartSlice.actions;
export default cartSlice.reducer;
