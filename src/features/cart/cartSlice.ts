import { RootState } from '@/app/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductType } from '../products/ProductCard';

export type CartItem = {
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
  name: string;
  category: string;
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
        state.items[action.payload.name] = {
          ...action.payload,
          quantity: 1,
        };
      }
    },
    removeFromCart: (state, action: PayloadAction<ProductType>) => {
      const item = state.items[action.payload.name];

      if (item) {
        delete state.items[action.payload.name];
      }
    },
    increaseQty: (state, action: PayloadAction<ProductType>) => {
      const item = state.items[action.payload.name];

      if (item) {
        state.items[action.payload.name] = {
          ...item,
          quantity: item.quantity + 1,
        };
      }
    },
    decreaseQty: (state, action: PayloadAction<ProductType>) => {
      let item = state.items[action.payload.name];

      if (item) {
        if (item.quantity > 1) {
          state.items[action.payload.name] = {
            ...item,
            quantity: item.quantity - 1,
          };
        } else {
          delete state.items[action.payload.name];
        }
      }
    },
    clearCart: (state) => {
      state.items = {};
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      () => true,
      (state: CartState) => {
        state.total = Object.values(state.items).reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      }
    );
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;

// Selectors
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartTotal = (state: RootState) => state.cart.total;
