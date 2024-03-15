'use client';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './Features/cart/cartSlice';
import sidebarReducer from './Features/sidebar/sidebarSlice';
export const store = configureStore({
  reducer: { cart: cartReducer, sidebar: sidebarReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
