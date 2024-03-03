import {
  addOrModifyBookInCart,
  removeBookFromCart,
  toggleBookWishlist,
} from "@/app/GlobalRedux/Features/cart/cartSlice";

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
    })
  );
};
export const isAddedToWishlist = (wishlist, book, chosenLibrary, type) => {
  //we access to the list  of books added to wishlist
  const wishlistBooks = wishlist[chosenLibrary][type];

  const isAdded = wishlistBooks.some((el) => el.id === book) || false;

  return isAdded;
};
export const addToCart = (dispatch, book, chosenLibrary, type, quantity = 1) => {
  // Assuming you have access to the necessary details from props or elsewhere
  dispatch(
    addOrModifyBookInCart({
      book, // The item prop passed to the ItemCard component
      chosenLibrary,
      type,
      quantity,
    })
  );
};
export const removeFromCart = (dispatch, bookId, chosenLibrary, type) => {
  dispatch(
    removeBookFromCart({
      bookId,
      chosenLibrary,
      type,
    })
  );
};
