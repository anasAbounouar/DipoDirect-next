'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faBars,
  faCartShopping,
} from '@fortawesome/free-solid-svg-icons';
import { useUser } from '@clerk/nextjs';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTotalBooksInCart,
  getTotalBooksInWishlist,
} from '@/utils/cartUtils';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { clickOnProfilePhoto } from '@/utils/clickProfile';
import { toggleSidebar } from '@/app/GlobalRedux/Features/sidebar/sidebarSlice';

const MobileNavigationBar: React.FC = () => {
  const dispatch = useDispatch();
  const toggleSideBar = () => {
    dispatch(toggleSidebar());
  };
  const isSideBarActive = useSelector(
    (state: RootState) => state?.sidebar?.isSideBarActive,
  );

  const { user } = useUser();
  const pathname = usePathname();

  const wishlist = useSelector((state: RootState) => state.cart.wishlist);

  const cart = useSelector((state: RootState) => state.cart.cart);

  const cartTotalCount = getTotalBooksInCart(cart)?.length;

  const wishlistTotalCount = getTotalBooksInWishlist(wishlist).length;

  // Function to check if the current route matches the dynamic paths
  const shouldShowEqualize = (): boolean => {
    const regexPattern = /^\/([^\/]+)\/([^\/]+)$/; // Adjust regex as needed
    return regexPattern.test(pathname);
  };
  //   const userImage = user?.imageUrl || '/assets/defaultUserImage.jpg';
  let userImage = '';
  if (user) {
    if (user.imageUrl) {
      userImage = user.imageUrl;
    } else {
      userImage = 'noAvatarUserImage.jpg';
    }
  } else {
    userImage = '/assets/defaultUserImage.jpg';
  }

  return (
    <nav
      className="fixed bottom-0 w-full bg-gray-200 flex justify-around  p-4  md:hidden z-[1000]"
      aria-label="Mobile navigation"
    >
      <ul className="flex justify-between mx-2 w-full items-center">
        <li>

          <Link
            className="relative flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-300"
            aria-label={`wishlist`}
            href="/wishlist"
          >
            <div
              className="shop-counter absolute bottom-2 left-7  w-4 h-4 bg-myHeartColor
             rounded-full flex items-center justify-center text-white text-sm"
            >
              {wishlistTotalCount}
            </div>
            <FontAwesomeIcon
              icon={faHeart}
              fontSize={20}
              className="text-myHeartColor"
            />
          </Link>
          <span className="text-xs"> Wishlist</span>
        </li>
        {user ? (
          <li onClick={clickOnProfilePhoto}>
            <div className="flex items-center justify-center">
              <Image
                src={userImage}
                alt="User avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
          </li>
        ) : (
          <li onClick={clickOnProfilePhoto}>
            <div className="flex items-center justify-center">
              <Image
                src={'/assets/login/unkownPerson.webp'}
                alt="User avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
          </li>
        )}
        {shouldShowEqualize() && (
          <li onClick={() => toggleSideBar()}>
            <div
              className={`flex items-center justify-center py-1 px-2   rounded-md  ${isSideBarActive ? 'bg-white' : 'bg-transparent'}`}
            >
              <FontAwesomeIcon icon={faBars} size="2x" />
            </div>
          </li>
        )}
        <li>
          <Link
            className="nav-link relative flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-300"
            aria-label="Shopping Cart. 0 items"
            href="/cart"
          >
            <div className="shop-counter absolute bottom-4   left-5  w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
              {cartTotalCount}
            </div>
            <FontAwesomeIcon fontSize={20} icon={faCartShopping} />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MobileNavigationBar;
