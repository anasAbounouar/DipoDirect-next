"use client";
import { Swiper, SwiperSlide } from "swiper/react";

import { NavLink } from "@/components/navlink";
import {
  addToCart,
  isAddedToWishlist,
  removeFromCart,
  toggleWishlist,
} from "@/utils/cartUtils";
import { Button, Input, Spinner } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import {
  faShield,
  faShieldHalved,
  faTruck,
  faHeart as fasHeart,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faAngleLeft,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addOrModifyBookInCart } from "@/app/GlobalRedux/Features/cart/cartSlice";
import { debounce } from "@/utils/input";

export default function Item({ params }) {
  const dispatch = useDispatch();
  const chosenLibrary = params.library;
  const type = params.itemsClass;
  const bookId = params.itemId;
  const cart = useSelector((state) => state.cart.cart);
  const [isLoading, setIsLoading] = useState(false);
  const [item, setItem] = useState();
  const tdStyles = {
    borderBottom: "1px solid #ccc",
  };

  async function gettingData() {
    setIsLoading(true); // Assume setIsLoading is a state setter function defined in your component

    try {
      const response = await fetch(
        `https://dipo-direct-api.onrender.com/api/supplies/${chosenLibrary}/${type}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok"); // Throws an error if response is not 2xx
      }
      const data = await response.json();
      const ele = data.books.find((item) => item?.id === +bookId);
      if (!ele) {
        throw new Error("Item not found"); // Handle case where the item is not found
      }
      setItem(ele); // Assume setItem is a state setter function defined in your component
      setQuantity(
        cart[chosenLibrary][type]?.find((e) => {
          return ele?.id === ele?.id;
        })?.quantity || 0
      );
    } catch (error) {
      console.error("Error fetching data: ", error);
      alert("error: " + error.message); // Display the error message
    } finally {
      setIsLoading(false); // Ensure loading state is updated in both success and error cases
    }
  }
  useEffect(() => {
    gettingData();
  }, []);

  const [quantity, setQuantity] = useState(0);

  // Define your details data as an array of objects
  const details = [
    { label: "Categorie", value: "Livres" },
    { label: "Niveau", value: "CP" },
    { label: "Année", value: "2022" },
    { label: "Language", value: "Arabe" },
    {
      label: "Description",
      value: "Manuel+Cahier d'exercices (vous devez prendre les 2 a la fois)",
    },
  ];

  const wishlist = useSelector((state) => state.cart.wishlist);
  const booksInCategory = cart[chosenLibrary]?.[type] ?? [];
  const addedToCart =
    booksInCategory?.some((element) => {
      return element?.id === +item?.id;
    }) || false;

  const addedToWishlist = isAddedToWishlist(
    wishlist,
    item,
    chosenLibrary,
    type
  );
  // const updateQuantity = debounce((newQuantity) => {
  //   setQuantity(newQuantity);
  //   // Here, you might also want to dispatch to your Redux store
  //   // Ensure to include validation if newQuantity is within allowed range
  // }, 500); // 500 ms delay
  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10); // Parse the input value to an integer
    if (
      !isNaN(newQuantity) &&
      newQuantity >= 0 &&
      newQuantity <= item?.maxQuantity
    ) {
      setQuantity(newQuantity); // Update local state
      // Dispatch an action to update Redux store, adjusted to use the new quantity
      dispatch(
        addOrModifyBookInCart({
          book: item,
          type,
          chosenLibrary,
          quantity: newQuantity,
        })
      );
    }
  };

  return (
    <section className="bg-myContent">
      {isLoading ? (
        <div role="alert" aria-busy="true">
          <Spinner /> {/* Use a loading spinner component */}
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <>
          <div className="bookPath flex items-start ms-8 justify-start p-3">
            {/* Header section with navigation and type selection */}

            <div className="w-full lg:w-5/12 py-3">
              <NavLink
                href={`/${chosenLibrary}`}
                className="capitalize font-bold text-black hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                aria-label={`go back  to ${chosenLibrary} library introduction`}
              >
                {chosenLibrary}
              </NavLink>
              {/* Use an aria-hidden arrow for visual users, but it's hidden from screen readers */}
              <span aria-hidden="true" className="mx-2 text-sm ">
                &gt;
              </span>
              <NavLink
                href={`/${chosenLibrary}/${type}`}
                className=" capitalize font-bold text-black hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                aria-label={`go back  to ${type} `}
              >
                {type}
              </NavLink>

              <span
                aria-hidden="true"
                className="text-gray-900 mx-2  capitalize"
              >
                &gt;
              </span>
              <span className="text-gray-900 capitalize">{item?.title}</span>
            </div>
          </div>

          <div className="bg-white mx-3 rounded-sm">
            <div className="flex flex-col lg:flex-row flex-wrap">
              <div className="lg:w-1/2 flex-col lg:flex-row flex items-center justify-between">
                {/* Left Column with image and likes */}
                <div className="lg:w-1/2 relative">
                  {/* Heart icon for adding to wishlist */}
                  <div className="relative pb-4 pt-2">
                    <button
                      onClick={() => {
                        toggleWishlist(dispatch, item, chosenLibrary, type);
                      }}
                      className="absolute bg-transparent p-1 left-0 top-0 text-myHeartColor z-10 outline-none hover:border-color-none"
                      aria-label={
                        addedToWishlist
                          ? "Remove from wishlist"
                          : "Add to wishlist"
                      }
                    >
                      {addedToWishlist ? (
                        <FontAwesomeIcon icon={fasHeart} className="text-xl" />
                      ) : (
                        <FontAwesomeIcon
                          icon={farHeart}
                          className="text-xl  "
                        />
                      )}
                    </button>
                  </div>
                  {item && item.imgSrc && (
                    <div
                      className="carousel-container"
                      aria-roledescription="carousel"
                      aria-label="Book images"
                    >
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
                        pagination={{
                          el: ".swiper-pagination",
                          clickable: true,
                        }}
                        // navigation={true}
                        navigation={{
                          nextEl: ".swiper-button-next",
                          prevEl: ".swiper-button-prev",
                        }}
                        modules={[EffectCoverflow, Pagination, Navigation]}
                        className="mySwiper"
                      >
                        {item.imgSrc.map((src, index) => (
                          <SwiperSlide key={index}>
                            <img
                              src={src}
                              alt={`${item?.title} image - Slide ${index + 1}`}
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
                  )}
                  {/* Carousel container with Swiper */}
                </div>
                <div className="w-10/12 lg:w-1/2  flex items-center justify-center  flex-col lg:items-start lg:mx-7">
                  {/* Right Column with item details */}

                  <div className="title text-black font-bold my-1 text-xl">
                    {item?.title}
                  </div>
                  <div className="level text-[#333] my-1 text-lg">
                    {item?.level}
                  </div>
                  <div className="nowprice text-blue-600 font-bold bg-white my-1 text-lg">
                    {item?.price} DH
                  </div>
                  <span>SKU: {item?.id}</span>
                  {/* social media  */}
                  <ul className="flex justify-between w-full px-0 mt-3 gap-1 ">
                    <li className="cursor-pointer">
                      <a
                        href="https://www.facebook.com/sharer/sharer.php?u=https://getbootstrap.com/docs/5.3/components/buttons/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="33"
                          height="32"
                          viewBox="0 0 33 32"
                          fill="none"
                        >
                          <path
                            d="M32.1285 15.646C32.1285 7.00283 24.9385 0 16.0643 0C7.19005 0 0 7.00283 0 15.646C0 23.4551 5.87447 29.928 13.5542 31.1027V20.1688H9.47338V15.646H13.5542V12.1988C13.5542 8.27785 15.9509 6.11202 19.6217 6.11202C21.3797 6.11202 23.218 6.41737 23.218 6.41737V10.2658H21.1919C19.1968 10.2658 18.5743 11.472 18.5743 12.7092V15.646H23.0295L22.317 20.1688H18.5743V31.1027C26.254 29.928 32.1285 23.4551 32.1285 15.646Z"
                            fill="#0000FF"
                          ></path>
                        </svg>
                      </a>
                    </li>
                    <li className="cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="33"
                        height="33"
                        viewBox="0 0 33 33"
                        fill="none"
                      >
                        <g clip-path="url(#clip0_1415_600)">
                          <path
                            d="M1.56956 15.8579C1.56881 18.5549 2.27352 21.1884 3.61351 23.5095L1.44141 31.4402L9.55748 29.3121C11.8023 30.5342 14.3174 31.1745 16.8733 31.1747H16.88C25.3175 31.1747 32.1857 24.3089 32.1893 15.87C32.191 11.7807 30.5999 7.93541 27.7092 5.04243C24.8189 2.14969 20.975 0.555768 16.8794 0.553902C8.44095 0.553902 1.57317 7.41932 1.56968 15.8579"
                            fill="url(#paint0_linear_1415_600)"
                          ></path>
                          <path
                            d="M1.02375 15.8529C1.02288 18.647 1.75285 21.3746 3.14061 23.7789L0.890625 31.9939L9.29772 29.7895C11.6141 31.0525 14.2222 31.7184 16.8761 31.7194H16.8829C25.6231 31.7194 32.7381 24.6066 32.7418 15.8656C32.7433 11.6294 31.095 7.6459 28.101 4.64927C25.1066 1.65303 21.1252 0.00174186 16.8829 0C8.14124 0 1.02724 7.11177 1.02375 15.8529ZM6.03036 23.3648L5.71645 22.8665C4.39687 20.7683 3.70037 18.3437 3.70137 15.8539C3.70423 8.58849 9.6171 2.67749 16.8879 2.67749C20.4089 2.67898 23.718 4.05157 26.2068 6.54193C28.6956 9.03254 30.065 12.3433 30.0642 15.8646C30.0609 23.13 24.1479 29.0418 16.8829 29.0418H16.8777C14.5121 29.0405 12.1921 28.4053 10.1688 27.2048L9.68727 26.9192L4.69833 28.2272L6.03036 23.3647V23.3648Z"
                            fill="url(#paint1_linear_1415_600)"
                          ></path>
                          <path
                            d="M12.9227 9.22539C12.6259 8.5656 12.3135 8.55228 12.0312 8.54071C11.8 8.53076 11.5357 8.53151 11.2717 8.53151C11.0074 8.53151 10.5781 8.63092 10.2151 9.02719C9.85184 9.42384 8.82812 10.3824 8.82812 12.3319C8.82812 14.2815 10.2481 16.1656 10.4461 16.4302C10.6443 16.6944 13.1874 20.8231 17.2151 22.4114C20.5624 23.7314 21.2436 23.4688 21.9701 23.4026C22.6967 23.3367 24.3146 22.4444 24.6447 21.5191C24.975 20.5939 24.975 19.8008 24.876 19.6351C24.777 19.47 24.5127 19.3709 24.1164 19.1728C23.72 18.9746 21.7719 18.0159 21.4087 17.8837C21.0454 17.7515 20.7813 17.6856 20.517 18.0824C20.2527 18.4785 19.4939 19.3709 19.2626 19.6351C19.0316 19.9 18.8003 19.933 18.4041 19.7348C18.0076 19.536 16.7314 19.118 15.2174 17.7682C14.0394 16.7179 13.2441 15.4208 13.0129 15.024C12.7818 14.6279 12.9882 14.4131 13.1869 14.2157C13.3649 14.0382 13.5833 13.753 13.7816 13.5217C13.9792 13.2903 14.0451 13.1252 14.1773 12.8609C14.3095 12.5964 14.2433 12.365 14.1444 12.1668C14.0451 11.9686 13.2751 10.0089 12.9227 9.22539Z"
                            fill="white"
                          ></path>
                        </g>
                        <defs>
                          <linearGradient
                            id="paint0_linear_1415_600"
                            x1="1538.84"
                            y1="3089.18"
                            x2="1538.84"
                            y2="0.553902"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#1FAF38"></stop>
                            <stop offset="1" stop-color="#60D669"></stop>
                          </linearGradient>
                          <linearGradient
                            id="paint1_linear_1415_600"
                            x1="1593.45"
                            y1="3199.39"
                            x2="1593.45"
                            y2="0"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#F9F9F9"></stop>
                            <stop offset="1" stop-color="white"></stop>
                          </linearGradient>
                          <clipPath id="clip0_1415_600">
                            <rect
                              width="31.856"
                              height="32.1"
                              fill="white"
                              transform="translate(0.887695)"
                            ></rect>
                          </clipPath>
                        </defs>
                      </svg>
                    </li>
                    <li className="cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="34"
                        height="34"
                        viewBox="0 0 34 34"
                        fill="none"
                      >
                        <g clip-path="url(#clip0_1415_605)">
                          <path
                            d="M17.1007 0C12.5967 0 12.0304 0.020746 10.2607 0.0995807C8.4911 0.182565 7.28576 0.46056 6.22979 0.871331C5.12215 1.28795 4.11887 1.94146 3.29009 2.78618C2.44589 3.61539 1.79245 4.61855 1.37524 5.72589C0.964467 6.77978 0.684396 7.9872 0.603487 9.7506C0.524652 11.5244 0.503906 12.0887 0.503906 16.5989C0.503906 21.1049 0.524652 21.6692 0.603487 23.4388C0.686471 25.2064 0.964467 26.4117 1.37524 27.4677C1.80053 28.5589 2.36689 29.4842 3.29009 30.4074C4.21121 31.3306 5.13648 31.899 6.22772 32.3222C7.28576 32.733 8.48903 33.0131 10.2566 33.094C12.0283 33.1728 12.5926 33.1936 17.1007 33.1936C21.6088 33.1936 22.171 33.1728 23.9427 33.094C25.7082 33.011 26.9177 32.733 27.9736 32.3222C29.0806 31.9054 30.0831 31.2519 30.9113 30.4074C31.8345 29.4842 32.4008 28.5589 32.8261 27.4677C33.2348 26.4117 33.5149 25.2064 33.5979 23.4388C33.6767 21.6692 33.6975 21.1049 33.6975 16.5968C33.6975 12.0887 33.6767 11.5244 33.5979 9.75268C33.5149 7.9872 33.2348 6.77978 32.8261 5.72589C32.409 4.61852 31.7555 3.61535 30.9113 2.78618C30.0827 1.94115 29.0794 1.28759 27.9716 0.871331C26.9135 0.46056 25.7061 0.18049 23.9406 0.0995807C22.1689 0.020746 21.6067 0 17.0965 0H17.1028H17.1007ZM15.6132 2.99157H17.1028C21.5341 2.99157 22.059 3.00609 23.8079 3.087C25.426 3.15961 26.3057 3.43138 26.8907 3.65751C27.6645 3.95833 28.2184 4.31931 28.7993 4.9002C29.3802 5.48108 29.7391 6.03293 30.0399 6.80883C30.2681 7.39179 30.5378 8.27142 30.6105 9.8896C30.6914 11.6385 30.708 12.1634 30.708 16.5926C30.708 21.0219 30.6914 21.5488 30.6105 23.2977C30.5378 24.9159 30.2661 25.7935 30.0399 26.3785C29.7739 27.0991 29.3492 27.7507 28.7973 28.2851C28.2164 28.8659 27.6645 29.2248 26.8886 29.5257C26.3077 29.7539 25.4281 30.0236 23.8079 30.0983C22.059 30.1771 21.5341 30.1958 17.1028 30.1958C12.6714 30.1958 12.1445 30.1771 10.3956 30.0983C8.7774 30.0236 7.89984 29.7539 7.31481 29.5257C6.59388 29.26 5.94169 28.836 5.40618 28.2851C4.85382 27.7499 4.42847 27.0977 4.16142 26.3764C3.93529 25.7935 3.66352 24.9138 3.59091 23.2956C3.51207 21.5468 3.49548 21.0219 3.49548 16.5885C3.49548 12.1571 3.51207 11.6343 3.59091 9.88545C3.66559 8.26727 3.93529 7.38764 4.1635 6.8026C4.46431 6.02878 4.82529 5.47486 5.40618 4.89397C5.98707 4.31309 6.53891 3.95418 7.31481 3.65337C7.89984 3.42516 8.7774 3.15546 10.3956 3.08078C11.9266 3.01024 12.52 2.98949 15.6132 2.98742V2.99157ZM25.9613 5.74663C25.6997 5.74663 25.4408 5.79815 25.1991 5.89824C24.9575 5.99832 24.7379 6.14502 24.553 6.32996C24.3681 6.5149 24.2214 6.73446 24.1213 6.97609C24.0212 7.21772 23.9697 7.4767 23.9697 7.73825C23.9697 7.99979 24.0212 8.25877 24.1213 8.5004C24.2214 8.74204 24.3681 8.96159 24.553 9.14653C24.7379 9.33147 24.9575 9.47817 25.1991 9.57826C25.4408 9.67834 25.6997 9.72986 25.9613 9.72986C26.4895 9.72986 26.9961 9.52003 27.3696 9.14653C27.7431 8.77303 27.9529 8.26646 27.9529 7.73825C27.9529 7.21004 27.7431 6.70346 27.3696 6.32996C26.9961 5.95646 26.4895 5.74663 25.9613 5.74663ZM17.1028 8.07433C15.9722 8.05669 14.8495 8.26413 13.8 8.68456C12.7504 9.10498 11.7949 9.73001 10.9892 10.5232C10.1835 11.3165 9.54368 12.262 9.10693 13.3049C8.67018 14.3478 8.44526 15.4672 8.44526 16.5978C8.44526 17.7285 8.67018 18.8478 9.10693 19.8907C9.54368 20.9336 10.1835 21.8792 10.9892 22.6724C11.7949 23.4656 12.7504 24.0906 13.8 24.5111C14.8495 24.9315 15.9722 25.1389 17.1028 25.1213C19.3403 25.0864 21.4744 24.173 23.0444 22.5784C24.6143 20.9837 25.4943 18.8356 25.4943 16.5978C25.4943 14.36 24.6143 12.2119 23.0444 10.6173C21.4744 9.0226 19.3403 8.10924 17.1028 8.07433ZM17.1028 11.0638C18.5702 11.0638 19.9775 11.6468 21.0151 12.6844C22.0528 13.722 22.6357 15.1293 22.6357 16.5968C22.6357 18.0642 22.0528 19.4715 21.0151 20.5092C19.9775 21.5468 18.5702 22.1297 17.1028 22.1297C15.6353 22.1297 14.228 21.5468 13.1904 20.5092C12.1527 19.4715 11.5698 18.0642 11.5698 16.5968C11.5698 15.1293 12.1527 13.722 13.1904 12.6844C14.228 11.6468 15.6353 11.0638 17.1028 11.0638Z"
                            fill="#C32AA3"
                          ></path>
                        </g>
                        <defs>
                          <clipPath id="clip0_1415_605">
                            <rect
                              width="33.1936"
                              height="33.1936"
                              fill="white"
                              transform="translate(0.503906)"
                            ></rect>
                          </clipPath>
                        </defs>
                      </svg>
                    </li>
                    <li className="cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="33"
                        height="32"
                        viewBox="0 0 33 32"
                        fill="none"
                      >
                        <circle
                          cx="16.287"
                          cy="15.83"
                          r="15.83"
                          fill="#1787E0"
                        ></circle>
                        <path
                          d="M19.8395 12.5564L12.6627 17.0421C12.7886 17.4428 12.83 17.8652 12.7845 18.2826L19.4422 20.7789C19.8675 20.1722 20.4995 19.7413 21.2197 19.5672C21.94 19.3931 22.699 19.4877 23.3544 19.8332C24.0099 20.1787 24.5169 20.7514 24.7804 21.4439C25.0438 22.1365 25.0456 22.9014 24.7854 23.5951C24.5253 24.2889 24.021 24.864 23.3671 25.2126C22.7133 25.5612 21.9547 25.6593 21.2337 25.4886C20.5126 25.3179 19.8786 24.89 19.4505 24.2853C19.0223 23.6805 18.8294 22.9404 18.9079 22.2036L12.2517 19.7073C11.895 20.2161 11.3912 20.6035 10.8079 20.8176C10.2246 21.0317 9.58978 21.0621 8.98866 20.9049C8.38755 20.7477 7.84894 20.4102 7.44518 19.938C7.04143 19.4657 6.79185 18.8812 6.72998 18.2629C6.6681 17.6447 6.7969 17.0223 7.09906 16.4794C7.40122 15.9364 7.86227 15.499 8.42031 15.2257C8.97834 14.9525 9.60662 14.8565 10.2208 14.9508C10.8349 15.045 11.4055 15.3249 11.856 15.7529L19.0312 11.2672C18.8081 10.5607 18.8503 9.79699 19.1499 9.11934C19.4495 8.44168 19.986 7.89656 20.6588 7.58616C21.3316 7.27576 22.0945 7.22139 22.8045 7.43324C23.5145 7.6451 24.1229 8.10863 24.5156 8.73695C24.9083 9.36527 25.0584 10.1152 24.9377 10.8463C24.817 11.5773 24.4338 12.2393 23.86 12.708C23.2861 13.1768 22.5611 13.4201 21.8206 13.3925C21.0802 13.3649 20.3753 13.0682 19.838 12.558L19.8395 12.5564Z"
                          fill="white"
                        ></path>
                      </svg>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="w-full lg:w-1/2 p-4 ">
                {/* Pricing Info */}
                <div className="text-xl font-semibold mb-4">
                  Sous panier:{" "}
                  <span className="text-green-600">
                    {quantity * item?.price} DH
                  </span>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-2 mb-4 justify-center flex-col">
                  <span className="text-myHeartColor">Votre Quantité</span>
                  <div className="flex flex-row  items-baseline mt-1">
                    <Button
                      className={`text-lg !min-w-2 px-2 !h-[29px] !min-h-0 mx-3 py-1 border rounded border-black ${
                        quantity > 0 ? "bg-white" : "bg-gray-200 border-none"
                      }`}
                      disabled={quantity === 0}
                      onClick={() => {
                        if (quantity > 1) {
                          const newQuantity = quantity - 1;
                          addToCart(
                            dispatch,
                            item,
                            chosenLibrary,
                            type,
                            newQuantity
                          );
                          setQuantity((prevQuantity) => prevQuantity - 1);
                        } else if (quantity === 1) {
                          setQuantity(0);
                          removeFromCart(
                            dispatch,
                            item?.id,
                            chosenLibrary,
                            type
                          );
                        }
                      }}
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </Button>
                    <input
                      type="number"
                      className="w-[55px] text-center mx-3 border-b-2 py-1 outline-none"
                      value={quantity}
                      onChange={handleQuantityChange}
                      max={item?.maxQuantity}
                    />

                    <Button
                      className={`text-lg !min-w-2 px-2 !h-[29px] !min-h-0 mx-3 py-1 border rounded border-black ${
                        quantity < item?.maxQuantity
                          ? "bg-white"
                          : "bg-gray-200 border-none"
                      }`}
                      disabled={quantity === item?.maxQuantity || false}
                      onClick={() => {
                        if (quantity < item?.maxQuantity) {
                          const newQuantity = quantity + 1;
                          // dispatch(
                          //   addOrModifyBookInCart({
                          //     book: item, // The item prop passed to the ItemCard component
                          //     type,
                          //     chosenLibrary,
                          //     newQuantity,
                          //   })
                          // );
                          addToCart(
                            dispatch,
                            item,
                            chosenLibrary,
                            type,
                            newQuantity
                          );
                          setQuantity((prevQuantity) => prevQuantity + 1);
                        }
                      }}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </Button>
                  </div>
                </div>
                <div className="mb-4  p-3 flex items-center justify-center ">
                  <div className="w-6/12 border rounded-sm py-3  text-[#777] text-center">
                    {" "}
                    Quantité max :{" "}
                    <span className="font-semibold"> {item?.maxQuantity}</span>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="space-y-5 border p-3 rounded-sm">
                  <Link
                    className="flex items-center text-purple-600"
                    href={"/commandearrivera"}
                  >
                    <FontAwesomeIcon icon={faTruck} className="text-xl mr-2" />
                    Quand ma commande arrivera ?
                  </Link>
                  <Link
                    className="flex items-center text-green-600 cursor-pointer"
                    href={"/wishlist"}
                  >
                    <FontAwesomeIcon icon={farHeart} className="text-xl mr-2" />
                    Voir la liste d'envies
                  </Link>
                  <div className="flex items-center text-gray-600">
                    <FontAwesomeIcon
                      icon={faShieldHalved}
                      className="text-xl mr-2"
                    />
                    3D Secured Payment by Card
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-4 mt-3 justify-center lg:justify-start lg:ml-12 lg:pl-11">
              <h2
                className="details-li font-bold text-2xl text-myBrand border-b-myBrand border-b-2"
                role="region"
                aria-labelledby="detailsHeading"
              >
                Details
              </h2>
            </div>
            <table
              className="w-11/12 m-auto my-4"
              id="detailsTable"
              aria-describedby="detailsDescription"
            >
              <tbody>
                {details.map((detail, index) => (
                  <tr key={index}>
                    <th
                      scope="row"
                      className={` text-gray-500 font-normal p-2`}
                      style={tdStyles}
                    >
                      {detail.label}
                    </th>
                    <td style={tdStyles}>{detail.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
}
