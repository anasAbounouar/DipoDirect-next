import { findFirstLibraryWithBooks } from "@/utils/cartUtils";
import { useMemo } from "react";

const PurchasedBooksInCategory = (cart, supplier, category) => {
  if (supplier && category) {
    return cart[supplier][category];
  }
  return [];
};

export function useCartItems(cart) {
  const { supplier, categories } = findFirstLibraryWithBooks(cart);
  const papeterieItems = useMemo(
    () => PurchasedBooksInCategory(cart, supplier, "papeterie"),
    [cart]
  );
  const ecrituresItems = useMemo(
    () => PurchasedBooksInCategory(cart, supplier, "ecritures"),
    [cart]
  );
  const organisationItems = useMemo(
    () => PurchasedBooksInCategory(cart, supplier, "organisation"),
    [cart]
  );

  // Any other logic related to items

  return {
    supplier,
    categories,
    papeterieItems,
    ecrituresItems,
    organisationItems,
  };
}
