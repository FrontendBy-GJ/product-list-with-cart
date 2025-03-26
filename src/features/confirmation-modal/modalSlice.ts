import { RootState } from '@/app/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    orderConfirmed: false,
  },
  reducers: {
    confirmOrder: (state, action: PayloadAction<boolean>) => {
      state.orderConfirmed = action.payload;
    },
  },
});

export const { confirmOrder } = modalSlice.actions;
export default modalSlice.reducer;

// Selectors
export const selectOrderConfirmed = (state: RootState) =>
  state.modal.orderConfirmed;
