import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {},
});

export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<AppStore['getState']>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
