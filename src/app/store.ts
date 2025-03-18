import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import cartReducer from '@/features/cart/cartSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<AppStore['getState']>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
