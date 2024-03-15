import {
  addOrModifyBookInCart,
  removeBookFromCart,
  toggleBookWishlist,
} from '@/app/GlobalRedux/Features/cart/cartSlice';
import { parsePrice } from './price';

// Utility function to count total books in wishlist
export const getTotalBooksInWishlist = (wishlist) => {
  let totalBooks = [];
  for (const library in wishlist) {
    for (const category in wishlist[library]) {
      if (wishlist[library][category]) {
        for (const book in wishlist[library][category]) {
          totalBooks.push(book);
        }
      }
    }
  }
  return totalBooks;
};
export const getTotalBooksInCart = (cart) => {
  let totalBooks = [];
  for (const library in cart) {
    for (const category in cart[library]) {
      if (cart[library][category]) {
        cart[library][category].forEach((obj) => {
          totalBooks.push(obj);
        });
      }
    }
  }

  return totalBooks;
};

export const toggleWishlist = (dispatch, book, chosenLibrary, type) => {
  dispatch(
    toggleBookWishlist({
      book,
      chosenLibrary,
      type,
    }),
  );
};
export const isAddedToWishlist = (wishlist, book, chosenLibrary, type) => {
  //we access to the list  of books added to wishlist
  const wishlistBooks = wishlist[chosenLibrary][type];

  const isAdded =
    wishlistBooks.some((el) => {
      return el?.id === book?.id;
    }) || false;

  return isAdded;
};
export const addToCart = (
  dispatch,
  book,
  chosenLibrary,
  type,
  quantity = 1,
) => {
  // Assuming you have access to the necessary details from props or elsewhere
  dispatch(
    addOrModifyBookInCart({
      book, // The item prop passed to the ItemCard component
      chosenLibrary,
      type,
      quantity,
    }),
  );
};
export const removeFromCart = (dispatch, bookId, chosenLibrary, type) => {
  dispatch(
    removeBookFromCart({
      bookId,
      chosenLibrary,
      type,
    }),
  );
};
export const getTotalPriceInCart = (cart) => {
  let totalPrice = 0;

  for (const library in cart) {
    for (const category in cart[library]) {
      const books = cart[library][category];
      books.forEach((book) => {
        const bookPrice = parsePrice(book.price); // Assuming `price` is a property of `book`

        totalPrice += bookPrice * book.quantity;
      });
    }
  }

  return totalPrice.toFixed(2); // Returns the total price as a string formatted to two decimal places
};

export const findFirstLibraryWithBooks = (cart) => {
  let chosenLibrary = '';
  let types = [];

  for (const [libraryName, categories] of Object.entries(cart)) {
    for (const [categoryName, items] of Object.entries(categories)) {
      if (items.length > 0) {
        // If the category has items
        if (!chosenLibrary) {
          chosenLibrary = libraryName;
          types.push(categoryName);
        } else if (chosenLibrary === libraryName) {
          // If we have already found this library but found another category with items
          types.push(categoryName);
        }
      }
    }
    if (chosenLibrary) {
      // Stop searching once the first library with books is found
      break;
    }
  }
  const supplier = chosenLibrary;
  const categories = types;
  return { supplier, categories };
};
