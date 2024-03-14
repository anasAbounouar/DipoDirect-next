import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';
import {
  faAngleLeft,
  faArrowRight,
  faArrowUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist } from '@/utils/cartUtils';
import MyButton from '../common/myButton';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
export default function WishlistCard({ item, chosenLibrary, type }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const goToItem = (itemId) => {
    const nextPath = `/${chosenLibrary}/${type}/${itemId}`;
    router.push(nextPath);
  };
  const wishlistBooks = useSelector(
    (state: RootState) => state?.cart.wishlist?.[chosenLibrary]?.[type],
  );

  const addedToWishlist =
    wishlistBooks?.some((book) => book.id === item.id) || false;
  return (
    <div className="px-1 flex flex-col h-full justify-between    align-baseline shadow-md">
      <div className="relative pb-4 pt-2 ">
        <button
          onClick={() => {
            toggleWishlist(dispatch, item, chosenLibrary, type);
          }}
          className="absolute bg-transparent p-1 left-0 top-0 text-myHeartColor z-10 outline-none hover:border-color-none"
          aria-label={
            addedToWishlist ? 'Remove from wishlist' : 'Add to wishlist'
          }
        >
          {addedToWishlist ? (
            <FontAwesomeIcon icon={fasHeart} className="text-xl" />
          ) : (
            <FontAwesomeIcon icon={farHeart} className="text-xl  " />
          )}
        </button>
      </div>
      <div className="carousel-container">
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 0,
            modifier: 0.5,
          }}
          pagination={{ el: '.swiper-pagination', clickable: true }}
          // navigation={true}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="mySwiper"
        >
          {item.imgSrc.map((src, index) => (
            <SwiperSlide key={index} onClick={() => {}}>
              <Image
                // fill={true}
                width={80}
                height={320}
                src={src}
                alt={`${item.title} image - Slide ${index + 1}`}
                className="mt-3 overflow-hidden border lg:border-solid !border-black rounded-lg px-1 lg:p-0"
              />
            </SwiperSlide>
          ))}
          <div className="slider-controller flex justify-between items-center">
            <div className="swiper-button-prev slider-arrow cursor-pointer bg-gray-200 hover:bg-gray-300 rounded-full p-1 !h-[30px] !w-[30px]">
              <FontAwesomeIcon
                icon={faAngleLeft}
                className=" text-gray-800 text-sm "
              />
            </div>
            <div className="swiper-pagination"></div>{' '}
            {/* Unstyled, add your classes */}
            <div className="swiper-button-next slider-arrow cursor-pointer bg-gray-200 hover:bg-gray-300 rounded-full p-1 !h-[30px] !w-[30px]">
              <FontAwesomeIcon
                icon={faAngleLeft}
                className=" rotate-180 text-gray-800 text-sm "
              />
            </div>
          </div>
        </Swiper>
      </div>
      <div className="text-center my-2"> {item.title}</div>
      <div className="text-center my-2">{item.price} MAD</div>

      <MyButton
        isLoading={isLoading}
        ariaLabel="see details"
        onClick={() => {
          setIsLoading(true);
          goToItem(item.id);
        }}
        icon={<FontAwesomeIcon icon={faArrowUp} className="rotate-45 " />}
        className="mx-2 my-3 max-h-[40px]  bg-myBrand text-white "
        text="Voir Details"
      />
      {/* <Button>Voir Details</Button> */}
    </div>
  );
}
