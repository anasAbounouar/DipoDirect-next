"use client";

import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  // justfor information
  libraries: {
    arrissala: {
      name: "Arrissala",
      categories: ["ecritures", "papeterie", "organisation"],
    },
    aladnane: {
      name: "Aladnane",
      categories: ["ecritures", "papeterie", "organisation"],
    },
  },
  // used elements
  cart: {},
  wishlist: {
    arrissala: { ecritures: [], papeterie: [], organisation: [] },
    aladnane: { ecritures: [], papeterie: [], organisation: [] },
  },
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addOrModifyBookInCart: (state, action) => {
      console.log("adding or modifying");
      const { book, type, chosenLibrary, quantity } = action.payload;

      // Initialize library in cart if not existent
      if (!state.cart[chosenLibrary]) {
        state.cart[chosenLibrary] = {
          ecritures: [],
          papeterie: [],
          organisation: [],
        };
      }

      // Find the book in the specified category of the library
      let existingBook = state.cart[chosenLibrary][type].find(
        (b) => b.id === book.id
      );

      if (existingBook) {
        // If book exists, modify its quantity
        existingBook.quantity = quantity;
        console.log("quantity modified");
      } else {
        // If book does not exist, add it with its quantity
        state.cart[chosenLibrary][type].push({
          ...book,
          quantity,
       
        });
      }
    },
    removeBookFromCart: (state, action) => {
      const { bookId, type, chosenLibrary } = action.payload;
      state.cart[chosenLibrary][type] = state.cart[chosenLibrary][type].filter(
        (item) => item.id !== bookId
      );
    },
    toggleBookWishlist: (state, action) => {
      const { book, chosenLibrary, type } = action.payload;

      // Check if the book is already in the wishlist for the given library and type
      const existingIndex = state.wishlist[chosenLibrary][type].findIndex(
        (b) => b.id === book.id
      );

      if (existingIndex > -1) {
        // If the book is found, remove it from the wishlist
        state.wishlist[chosenLibrary][type].splice(existingIndex, 1);
      } else {
        // If the book is not found, add it to the wishlist under the chosen library and type
        state.wishlist[chosenLibrary][type].push(book);
      }
    },
  },
});

export const { addOrModifyBookInCart, removeBookFromCart, toggleBookWishlist } =
  cartSlice.actions;

export default cartSlice.reducer;
