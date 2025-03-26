import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import cartReducer from '@/features/cart/cartSlice';
import modalReducer from '@/features/confirmation-modal/modalSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    modal: modalReducer,
  },
});

export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<AppStore['getState']>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
