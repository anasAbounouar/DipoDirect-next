// Interfaces for books and library structure
interface Book {
  _id: string;
  id: number;
  title: string;
  level: string;
  langue: string;
  imgSrc: string[];
  price: string;
  addedToCart: boolean;
  addedToWishlist: boolean;
  littleBooksCount: number;
  maxQuantity: number;
}

interface Library {
  ecritures: Book[];
  papeterie: Book[];
  organisation: Book[];
}

// Interface for the cart and wishlist within the state
interface CartAndWishlistState {
  arrissala: Library;
  aladnane: Library;
}

// Interface for the entire state managed by this slice
interface CartState {
  categories: string[];
  libraries: {
    [key: string]: {
      name: string;
      categories: string[];
    };
  };
  cart: CartAndWishlistState;
  wishlist: CartAndWishlistState;
}

// Interface for the root state (if you have other state slices, include them here)
interface RootState {
  cart: CartState;
  // Include other slices here as needed
}
