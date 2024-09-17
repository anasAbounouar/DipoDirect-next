'use client';

interface Book {
  _id: string;
  id: number;
  title: string;

  level: string;

  langue: string;

  imgSrc: string[];

  price: string;

  addedToCart: Boolean;

  addedToWishlist: Boolean;

  littleBooksCount: number;

  maxQuantity: number;
}
interface Library {
  ecritures: Book[];
  papeterie: Book[];
  organisation: Book[];
}
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  categories: ['ecritures', 'papeterie', 'organisation'],
  // justfor information
  libraries: {
    arrissala: {
      name: 'Arrissala',
      categories: ['ecritures', 'papeterie', 'organisation'],
    },
    aladnane: {
      name: 'Aladnane',
      categories: ['ecritures', 'papeterie', 'organisation'],
    },
  },
  // used elements
  cart: {
    arrissala: { ecritures: [], papeterie: [], organisation: [] },
    aladnane: { ecritures: [], papeterie: [], organisation: [] },
  },
  wishlist: {
    arrissala: {
      ecritures: [],
      papeterie: [
        // {
        //   _id: '65ef344b6f4d15d0cf6dd822',

        //   id: 11,

        //   title: 'je sais pas',

        //   level: 'CM2',

        //   langue: 'ar',

        //   imgSrc: [
        //     '/assets/ArrissalaPhotos/1.png',
        //     '/assets/ArrissalaPhotos/0.png',
        //     '/assets/ArrissalaPhotos/1.png',
        //   ],

        //   price: '230.00',

        //   addedToCart: false,

        //   addedToWishlist: false,

        //   littleBooksCount: 2,

        //   maxQuantity: 3,
        // },

        // {
        //   _id: '65ef344b6f4d15d0cf6dd823',

        //   id: 12,

        //   title: 'Miftah al qirâ’a 1',

        //   level: 'Petite',

        //   langue: 'fr',

        //   imgSrc: [
        //     '/assets/ArrissalaPhotos/1.png',
        //     '/assets/ArrissalaPhotos/0.png',
        //     '/assets/ArrissalaPhotos/1.png',
        //   ],

        //   price: '230.00',

        //   addedToCart: false,

        //   addedToWishlist: false,

        //   littleBooksCount: 2,

        //   maxQuantity: 3,
        // },

        // {
        //   _id: '65ef344b6f4d15d0cf6dd821',

        //   id: 1,

        //   title: 'mousaeid',

        //   level: 'Moyenne',

        //   langue: 'en',

        //   imgSrc: [
        //     '/assets/ArrissalaPhotos/2.png',
        //     '/assets/ArrissalaPhotos/0.png',
        //   ],

        //   price: '150',

        //   addedToCart: false,

        //   addedToWishlist: false,

        //   littleBooksCount: 1,

        //   maxQuantity: 4,
        // },

        // {
        //   _id: '65ef344b6f4d15d0cf6dd820',

        //   id: 0,

        //   title: 'Miftah al qirâ’a 1',

        //   level: '1 Bac',

        //   langue: 'fr',

        //   imgSrc: [
        //     '/assets/ArrissalaPhotos/1.png',
        //     '/assets/ArrissalaPhotos/0.png',
        //   ],

        //   price: '100',

        //   addedToCart: false,

        //   addedToWishlist: false,

        //   littleBooksCount: 2,

        //   maxQuantity: 3,
        // },
      ],
      organisation: [],
    },
    aladnane: { ecritures: [], papeterie: [], organisation: [] },
  },
};

export const cartSlice = createSlice({
  name: 'cart',
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
        (b) => b.id === book.id,
      );

      if (existingBook) {
        // If book exists, modify its quantity
        existingBook.quantity = quantity;
        console.log('quantity modified');
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
        (item) => item.id !== bookId,
      );
    },
    toggleBookWishlist: (state, action) => {
      const { book, chosenLibrary, type } = action.payload;

      // Check if the book is already in the wishlist for the given library and type
      const existingIndex = state.wishlist[chosenLibrary][type].findIndex(
        (b) => b.id === book.id,
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
