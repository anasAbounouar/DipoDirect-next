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
