"use client";

import { createSlice, nanoid } from "@reduxjs/toolkit";
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
  wishlist: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addOrModifyBookInCart: (state, action) => {
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
        (b) => b.book.id === book.id
      );

      if (existingBook) {
        // If book exists, modify its quantity
        existingBook.quantity = quantity;
      } else {
        // If book does not exist, add it with its quantity
        state.cart[chosenLibrary][type].push({
          ...book,
          quantity,
          id: nanoid(),
        });
      }
    },
    removeBookFromCart: (state, action) => {
      const { bookId, type, chosenLibrary } = action.payload;
      state.cart[chosenLibrary][type] = state.cart[chosenLibrary][type].filter(
        (item) => item.book.id !== bookId
      );
    },
    toggleBookWishlist: (state, action) => {
      const { bookId } = action.payload;
      const existingIndex = state.wishlist.findIndex(
        (book) => book.id === bookId
      );
      if (existingIndex > -1) {
        // Remove from wishlist if it exists
        state.wishlist.splice(existingIndex, 1);
      } else {
        // Find the book in any library or category to add to the wishlist
        Object.keys(state.cart).forEach((library) => {
          Object.keys(state.cart[library]).forEach((category) => {
            const foundBook = state.cart[library][category].find(
              (book) => book.id === bookId
            );
            if (foundBook) {
              state.wishlist.push(foundBook);
            }
          });
        });
      }
    },
  },
});

export const { addOrModifyBookInCart, removeBookFromCart, toggleBookWishlist } =
  cartSlice.actions;

export default cartSlice.reducer;
