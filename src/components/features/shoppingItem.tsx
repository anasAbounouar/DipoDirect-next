import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { useCallback, useEffect, useState } from 'react';
import {
  addToCart,
  isAddedToWishlist,
  removeFromCart,
  toggleWishlist,
} from '@/utils/cartUtils';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleLeft,
  faMinus,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
// import { addToCart, addToWishlist } from '../../../data/CartManager';
export default function ShoppingItem({ item, chosenLibrary, type }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState<number>(item.quantity);

  // In ProductCard component
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity !== quantity) {
      // Only update if quantity actually changes
      setQuantity(newQuantity);
    }
  };

  const cartStore = useSelector((state: RootState) => state?.cart);
  const wishlist = cartStore?.wishlist;
  const addedToWishlist = isAddedToWishlist(
    wishlist,
    item,
    chosenLibrary,
    type,
  );

  return (
    <div
      className={`w-full sm:w-5/12  lg:w-[30%] card-shadow custom-shadow  flex-col lg:flex-row flex items-center justify-between p-2 my-2 rounded-lg  `}
    >
      {/* Left Column with image and likes */}
      <div className="lg:w-1/2 relative">
        {/* Heart icon for adding to wishlist */}
        <div className="relative pb-4 pt-2 flex items-center justify-between">
          <div>
            {' '}
            <button
              onClick={() =>
                toggleWishlist(dispatch, item, chosenLibrary, type)
              }
              className="absolute bg-transparent  p-1 left-0 top-0 text-myHeartColor z-10 outline-none hover:border-color-none"
              aria-label={
                addedToWishlist ? 'Remove from wishlist' : 'Add to wishlist'
              }
            >
              <i
                className={`fa-regular ${addedToWishlist ? 'fa-solid' : ''}
                     fa-heart text-[25px] my-heart hover:text-[28px] duration-200 `}
              ></i>
            </button>
          </div>
          <div>
            <button
              className="bg-myDanger"
              aria-aria-label="delete item"
              onClick={() =>
                removeFromCart(dispatch, item.id, chosenLibrary, type)
              }
            >
              <i className="fa-solid fa-trash text-white"></i>
            </button>
          </div>
        </div>

        <div
          className="carousel-container"
          aria-roledescription="carousel"
          aria-label="Book images"
        >
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: -10,
              stretch: 10,
              depth: 250,
              modifier: 2.5,
            }}
            pagination={{
              el: '.swiper-pagination',
              clickable: true,
            }}
            // navigation={true}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            modules={[EffectCoverflow, Pagination, Navigation]}
            className="mySwiper"
          >
            {item &&
              item &&
              item.imgSrc &&
              item?.imgSrc.map((src, index) => (
                <SwiperSlide key={index}>
                  <Image
                    width={70}
                    height={280}
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
              <div className="swiper-pagination"></div>{' '}
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

        {/* Carousel container with Swiper */}
      </div>
      <div className="w-8/12 lg:w-1/2  flex items-start justify-center  flex-col  lg:mx-7">
        {/* Right Column with item details */}

        <div className="title text-black  my-2 text-sm">
          Titre : <span className="font-bold">{item.title}</span>
        </div>
        <div className="level text-[#333] my-1 text-sm">
          Niveau : {item.level}
        </div>
        <div className="nowprice   bg-white my-1 text-sm">
          Prix :{' '}
          <span className="text-blue-600 font-bold"> {item.price} DH</span>
        </div>
        <span className="text-sm my-1 ">SKU: {item.id}</span>
        <span className="text-sm my-1 ">Quantité-Max : {item.maxQuantity}</span>
        <span className="text-sm my-1 ">Quantité :</span>
        <div className="flex flex-row mt-4 justify-start ">
          <Button
            className={`m-0 text-lg !min-w-2 px-2 !h-[29px] !min-h-0 mx-3 py-1 border rounded border-black ${
              quantity > 0 ? 'bg-white' : 'bg-gray-200 border-none'
            }`}
            disabled={quantity === 0}
            onClick={() => {
              if (quantity > 1) {
                const newQuantity = quantity - 1;
                addToCart(dispatch, item, chosenLibrary, type, newQuantity);
                setQuantity((prevQuantity) => prevQuantity - 1);
              } else if (quantity === 1) {
                setQuantity(0);
                removeFromCart(dispatch, item?.id, chosenLibrary, type);
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
            className={`text-sm !min-w-2 px-2 !h-[29px] !min-h-0 mx-3 py-1 border rounded border-black ${
              quantity < item?.maxQuantity
                ? 'bg-white'
                : 'bg-gray-200 border-none'
            }`}
            disabled={quantity === item?.maxQuantity || false}
            onClick={() => {
              if (quantity < item?.maxQuantity) {
                const newQuantity = quantity + 1;
                addToCart(dispatch, item, chosenLibrary, type, newQuantity);
                setQuantity((prevQuantity) => prevQuantity + 1);
              }
            }}
          >
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </div>
        <div className="font-bold text-sm mt-3 w-full capitalize flex">
          sous-total :{' '}
          <strong className="text-myHeartColor ml-1 text-sm">
            {quantity * item.price} DH
          </strong>
        </div>
      </div>
    </div>
  );
}
