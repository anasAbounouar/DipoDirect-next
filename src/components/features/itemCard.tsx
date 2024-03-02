import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from "react-redux";
import {
  addOrModifyBookInCart,
  removeBookFromCart,
  toggleBookWishlist,
} from "@/app/GlobalRedux/Features/cart/cartSlice";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
// import styles from "./ItemCard.module.scss";:
const card = {
  borderRadius: "10px",
  background: "white",
  boxShadow: "0px 2.423px 2.423px 0px rgba(0, 0, 0, 0.25)",
};
const ItemCard = ({ item, type, chosenLibrary, onClick }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.cart);
  console.log(cart);

  //   console.log(type);
  //   const result = useSelector((state) => state.cart);
  //   console.log(result);
  //   console.log(result.wishlist);
  //   console.log(result.wishlist[chosenLibrary]);
  //   console.log(result.wishlist[chosenLibrary][type]);
  const wishlistBooks = useSelector(
    (state) => state.cart.wishlist[chosenLibrary][type]
  );

  const addedToWishlist =
    wishlistBooks?.some((book) => book.id === item.id) || false;

  const booksInCategory = cart[chosenLibrary]?.[type] ?? [];

  // Check if the item is in the cart

  const addedToCart =
    booksInCategory?.some((element) => element?.id === item.id) || false;

  const handleAddToCart = () => {
    console.log(cart[chosenLibrary]?.[type]);
    // Assuming you have access to the necessary details from props or elsewhere
    dispatch(
      addOrModifyBookInCart({
        book: item, // The item prop passed to the ItemCard component
        type,
        chosenLibrary,
        quantity: 1,
      })
    );
  };
  const handleRemoveFromCart = () => {
    dispatch(
      removeBookFromCart({
        bookId: item.id,
        type,
        chosenLibrary,
      })
    );
  };
  const handleAddingOrRemoving = () => {
    if (addedToCart) {
      handleRemoveFromCart();
    } else {
      handleAddToCart();
    }
  };
  const handleToggleWishlist = () => {
    dispatch(
      toggleBookWishlist({
        book: item,
        chosenLibrary,
        type,
      })
    );
  };
  return (
    <div className={`w-5/12 lg:w-2/12 m-1 bg-white`} style={card}>
      <div className="px-1">
        {/* Heart icon for adding to wishlist */}
        <div className="relative pb-4 pt-2">
          <button
            onClick={handleToggleWishlist}
            className="absolute bg-transparent p-1 left-0 top-0 text-myHeartColor z-10 outline-none hover:border-color-none"
            aria-label={
              addedToWishlist ? "Remove from wishlist" : "Add to wishlist"
            }
          >
            {addedToWishlist ? (
              <FontAwesomeIcon icon={fasHeart} className="text-xl" />
            ) : (
              <FontAwesomeIcon icon={farHeart} className="text-xl  " />
            )}
          </button>
        </div>

        {/* Carousel container with Swiper */}
        <div className="carousel-container">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 0,
              stretch: 10,
              depth: 200,
              modifier: 2.5,
            }}
            pagination={{ el: ".swiper-pagination", clickable: true }}
            // navigation={true}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            modules={[EffectCoverflow, Pagination, Navigation]}
            className="mySwiper"
          >
            {item.imgSrc.map((src, index) => (
              <SwiperSlide key={index} onClick={onClick}>
                <Image
                  // fill={true}
                  width={100}
                  height={400}
                  src={src}
                  alt={`${item.title} image - Slide ${index + 1}`}
                  className="mt-3 overflow-hidden border lg:border-solid !border-black rounded-lg px-1 lg:p-0"
                />
              </SwiperSlide>
            ))}
            <div className="slider-controller flex justify-between items-center">
              <div className="swiper-button-prev slider-arrow cursor-pointer bg-gray-200 hover:bg-gray-300 rounded-full p-2 !h-[44px] !w-[44px]">
                <FontAwesomeIcon
                  icon={faAngleLeft}
                  className=" text-gray-800 text-3xl "
                />
              </div>
              <div className="swiper-pagination"></div>{" "}
              {/* Unstyled, add your classes */}
              <div className="swiper-button-next slider-arrow cursor-pointer bg-gray-200 hover:bg-gray-300 rounded-full p-2 !h-[44px] !w-[44px]">
                <FontAwesomeIcon
                  icon={faAngleLeft}
                  className=" rotate-180 text-gray-800 text-3xl "
                />
              </div>
            </div>
          </Swiper>
        </div>

        <div className="down-actions my-3 flex flex-col items-center justify-center">
          {/* Description Panel */}
          <div
            className="flex items-center flex-col descriptionPanier"
            onClick={onClick}
          >
            <div className="level text-[#333]">{item.level}</div>
            <div className="title text-black font-[600]">{item.title}</div>
            <div className="nowprice text-blue-600 font-bold bg-white">
              {item.price} DH
            </div>
          </div>

          {/* Action Panel */}
          <div className="flex items-center p-2 justify-between actionPanier gap-3">
            <button
              onClick={handleAddingOrRemoving}
              className={`btn addToCartBtn    bg-[#004494]    text-white  ajouter ${
                addedToCart ? "addedToCartClass" : ""
              }  ${addedToCart ? "bg-myBrand" : ""}`}
              aria-pressed={addedToCart} // Indicates the state of the button
            >
              <span className="sr-only">
                {addedToCart
                  ? "Item has been added to the cart"
                  : "Add item to the cart"}
              </span>
              <span aria-hidden="true" className={`text-white `}>
                {/* Visually hidden text for screen readers */}
                {addedToCart ? (
                  "Bien ajouté ✓"
                ) : (
                  <span>
                    + Ajouter au panier
                    <FontAwesomeIcon icon={faShoppingCart} />;
                  </span>
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ItemCard;
