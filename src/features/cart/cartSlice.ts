import { RootState } from '@/app/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CartItem = {
  name: string;
  price: number;
  quantity: number;
};

type CartState = {
  items: Record<string, CartItem>;
  total: number;
};

const initialState: CartState = {
  items: {},
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items[action.payload.name];

      if (existingItem) {
        state.items[action.payload.name] = {
          ...existingItem,
          quantity: existingItem.quantity + action.payload.quantity,
        };
      } else {
        state.items[action.payload.name] = action.payload;
      }
      state.total = Object.values(state.items).reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;

// Selectors
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartTotal = (state: RootState) => state.cart.total;
