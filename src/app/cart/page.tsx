"use client";
import MyButton from "@/components/common/myButton";
import ShoppingItem from "@/components/features/shoppingItem";
import { useCartItems } from "@/hooks/useCartItems";
import {
  findFirstLibraryWithBooks,
  getTotalPriceInCart,
  isAddedToWishlist,
} from "@/utils/cartUtils";
import { parsePrice } from "@/utils/price";
import {
  faArrowLeft,
  faCaretDown,
  faCaretRight,
  faCartShopping,
  faEnvelope,
  faLocationDot,
  faPhone,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

export default function Cart() {
  const router = useRouter();
  const cartStore = useSelector((store) => store.cart);
  const cart = cartStore.cart;

  const {
    supplier,
    categories,
    papeterieItems,
    ecrituresItems,
    organisationItems,
  } = useCartItems(cart);

  const [types, setTypes] = useState([
    {
      name: "papeterie",
      items: papeterieItems,
      color: "myBrand",
      displayed: true,
    },
    {
      name: "ecritures",
      items: ecrituresItems,
      color: "myIndigo",
      displayed: true,
    },
    { name: "organisation", items: organisationItems, displayed: true },
  ]);
  useEffect(() => {
    setTypes([
      {
        name: "papeterie",
        items: papeterieItems,
        color: "myBrand",
        displayed: true,
      },
      {
        name: "ecritures",
        items: ecrituresItems,
        color: "myIndigo",
        displayed: true,
      },
      {
        name: "organisation",
        items: organisationItems,
        color: "myTurquoise",
        displayed: true,
      },
    ]);
  }, [papeterieItems, ecrituresItems, organisationItems]);

  const calculatePrice = (array) => {
    return array.reduce((total, item) => {
      const price = parsePrice(item.price);

      const quantity = item.quantity;
      return total + price * quantity;
    }, 0);
  };
  const wishlist = cart?.wishlist;
  const toggleDisplay = (typeName) => {
    setTypes(
      types.map((type) =>
        type.name === typeName ? { ...type, displayed: !type.displayed } : type
      )
    );
  };
  const totalPrice = useMemo(() => getTotalPriceInCart(cart), [cart]);

  const [isPapeterieDisplayed, setIsPapeterirDisplayed] = useState(true);
  const [isEcrituresDisplayed, setIsEcrituresDisplayed] = useState(true);
  const [isOrganisationDisplayed, setIsOrganisationDisplayed] = useState(true);

  return (
    <div>
      <div className="my-3 p-3 text-center">
        <span className="text-lg  ">Fournisseur</span> :{" "}
        <strong className="mx-1 capitalize text-lg"> {supplier}</strong>
      </div>
      <div className="flex flex-col lg:flex-row mx-4 lg:mx-11 justify-around  items-baseline lg:items-center">
        <ul className="text-xs flex flex-row items-center justify-center py-3">
          <li className="mr-1 mb-1 ">
            <FontAwesomeIcon className="text-myBrand" icon={faLocationDot} />
          </li>
          <li>153 Bd Moulay Idriss I, Casablanca 20250</li>
        </ul>
        <ul className="text-xs flex flex-row items-center justify-center py-3">
          <li className="mr-1 ">
            <FontAwesomeIcon className="text-myBrand" icon={faPhone} />
          </li>
          <li>(+212) 675058820</li>
        </ul>
        <ul className="text-xs flex flex-row items-center justify-center py-3">
          <li className="mr-1 ">
            <FontAwesomeIcon className="text-myBrand" icon={faEnvelope} />
          </li>
          <li>arrissala@gmail.com</li>
        </ul>
      </div>
      <div className="flex flex-col  items-center lg:items-start justify-between mx-4 lg:mx-11 my-4">
        <div className="flex flex-row my-3 ">
          <h3 className="font-bold text-sm">Votre Panier </h3>{" "}
          <FontAwesomeIcon fontSize={20} icon={faCartShopping} />
        </div>
        <div className="text-sm">
          Vous n'êtes pas prêt à passer à la caisse ?{" "}
          <Link className="underline hover:text-myBrand" href={`/${supplier}`}>
            Poursuivez vos achats
          </Link>
          .
        </div>
      </div>

      <div>
        {types.map(
          (type) =>
            type.items.length > 0 && (
              <div className="mx-4 lg:mx-11 my-4">
                hhh
                {type.name.charAt(0).toLocaleUpperCase() + type.name.slice(1)}
                <MyButton
                  text={
                    type.name.charAt(0).toLocaleUpperCase() + type.name.slice(1)
                  }
                  onClick={() => toggleDisplay(type.name)}
                  ariaLabel="show or hide papeterie"
                  icon={
                    <>
                      <FontAwesomeIcon
                        className=" ml-1"
                        aria-hidden="true"
                        icon={type.displayed ? faCaretDown : faCaretRight}
                      />
                    </>
                  }
                  className={` text-white rounded-md bg-${type.color}`}
                ></MyButton>
                {type.displayed && (
                  <>
                    {" "}
                    <div className="flex flex-row items-center flex-wrap gap-1 justify-around">
                      {type.items.map((item) => (
                        <ShoppingItem
                          key={item.id}
                          item={item}
                          chosenLibrary={supplier}
                          type={type.name}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )
        )}
      </div>
      <div className="flex flex-col lg:flex-row">
        {" "}
        <div className="w-11/12 lg:w-1/2 flex items-center justify-around m-3 gap-2">
          <div>
            <Button
              className="border-1 border-black text-black hover:border-none bg-transparent hover:bg-slate-400"
              onClick={() => {}}
            >
              <FontAwesomeIcon
                aria-hidden="true"
                icon={faArrowLeft}
                onClick={() => router.back()}
              />
              Poursuivre l'achat{" "}
            </Button>
          </div>
          <div>
            <Button className="bg-myDanger text-white">
              Vider le panier{" "}
              <FontAwesomeIcon aria-hidden="true" icon={faTrash} />
            </Button>
          </div>
        </div>
        <div className="w-11/12 lg:w-1/2  flex flex-col mx-5 my-11">
          <div className="w-full">
            <h2 className="font-bold text-xl text-center">Total Panier</h2>
            {types.map((type) => (
              <div className="p-3 flex flex-row justify-between">
                <p className="capitalize">{type.name}</p>{" "}
                <span className="font-bold">
                  {calculatePrice(type.items)} DH
                </span>
              </div>
            ))}
            <div className="p-3 flex flex-row justify-between">
              <p className="capitalize font-bold text-xl">total </p>{" "}
              <span className="font-bold">{totalPrice} DH</span>
            </div>
            <MyButton
              text="Continue"
              ariaLabel="continue to payement"
              onClick={() => console.log("continuing")}
              className="w-full my-3 bg-myBrand text-white rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
