"use client";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Features/cart/cartSlice";
export const store = configureStore({
  reducer: { cart: cartReducer },
});

export type RootState = ReturnType<typeof store.getState>;
