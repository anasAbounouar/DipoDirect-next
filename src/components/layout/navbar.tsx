'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { NavLink } from '../navlink';
// import Link from 'next/link';
import styled from 'styled-components';
import {
  faBagShopping,
  faCartShopping,
  faRightFromBracket,
  faSearch,
  faSignInAlt,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { Input } from '@nextui-org/react';
// import { SearchIcon } from "./SearchIcon";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from '@nextui-org/react';
import { usePathname, useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faHeart, faUser } from '@fortawesome/free-regular-svg-icons';
import { useSelector } from 'react-redux';
import {
  getTotalBooksInCart,
  getTotalBooksInWishlist,
  getTotalPriceInCart,
} from '@/utils/cartUtils';
import { SignedIn, useClerk, useUser, useSignIn } from '@clerk/nextjs';
import { EmailAddress } from '@clerk/nextjs/server';

const AcmeLogo = () => (
  <>
    <Image
      src="/assets/logo.png"
      alt="DipoDirect logo"
      width={70}
      height={20}
      className="h-8 rounded-lg"
    />
    <span className="self-center text-xl font-semibold whitespace-nowrap text-myBrand hover:text-blue-400 delay-100"></span>
  </>
);

const Nav = styled(Navbar)`
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
  a {
    font-size: 13px;
  }
  z-index: 99;
  a {
    /* color: black; */
    &:hover {
      color: var(--my-brand-color);
    }
  }
  a.active {
    color: var(--my-brand-color) !important;
  }
  ul {
    border-radius: 0px 0px 15px 15px;
  }
`;

export default function CartNavDesktop() {
  const path = usePathname();
  const isHomePath = path === '/';

  const { signOut, openSignIn, openSignUp } = useClerk();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const { isSignedIn, user, isLoaded } = useUser();
  const userEmail = user?.emailAddresses[0].emailAddress;
  // Check if user has an image
  const userImage = user?.imageUrl || '/assets/defaultUserImage.jpg';

  useEffect(() => {
    const handleScroll = () => {
      // Set isScrolled to true if page is scrolled more than 50 pixels, for example
      setIsScrolled(window.scrollY > 50);
    };

    // Add event listener
    window.addEventListener('scroll', handleScroll);

    // Remove event listener on cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // Empty array ensures this effect runs only once on mount

  const wishlist = useSelector((state: RootState) => state.cart.wishlist);

  const cart = useSelector((state: RootState) => state.cart.cart);

  const totalPrice = getTotalPriceInCart(cart);

  const cartTotalCount = getTotalBooksInCart(cart)?.length;

  const wishlistTotalCount = getTotalBooksInWishlist(wishlist).length;

  return (
    <Nav>
      <NavbarBrand>
        <NavLink exact="true" href="/" className="flex flex-row">
          <AcmeLogo />
          <p className=" ml-1 font-bold text-inherit self-center text-xl  whitespace-nowrap text-myBrand hover:text-blue-400 delay-100">
            {' '}
            DipoDirect
          </p>
        </NavLink>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {isHomePath && (
          <>
            <NavbarItem>
              <NavLink exact="true" color="foreground" href="/">
                Acceuil
              </NavLink>
            </NavbarItem>
            <NavbarItem>
              <NavLink
                exact="true"
                href="/about"
                aria-current="page"
                color="secondary"
              >
                A propos
              </NavLink>
            </NavbarItem>
            <NavbarItem>
              <NavLink exact="true" color="foreground" href="/contact">
                Contact
              </NavLink>
            </NavbarItem>
          </>
        )}

        {!isHomePath && (
          <>
            {' '}
            <NavbarItem
              style={{
                transition: 'opacity 1.5s ease, visibility 0.5s',
                opacity: isScrolled ? 0 : 1,
                visibility: isScrolled ? 'hidden' : 'visible',
              }}
            >
              <form
                className="flex relative items-center justify-center "
                role="search"
                id="rechercheGenerale"
              >
                <Input
                  size="md"
                  isClearable
                  radius="lg"
                  classNames={{
                    label: 'text-black/50 dark:text-white/90',
                    input: [
                      'bg-transparent',
                      'text-black/90 dark:text-white/90',
                      'placeholder:text-default-700/50 dark:placeholder:text-white/60',
                    ],
                    innerWrapper: 'bg-transparent',
                    inputWrapper: [
                      'shadow-xl',
                      'bg-default-200/50',
                      'dark:bg-default/60',
                      'backdrop-blur-xl',
                      'backdrop-saturate-200',
                      'hover:bg-default-200/70',
                      'dark:hover:bg-default/70',
                      'group-data-[focused=true]:bg-default-200/50',
                      'dark:group-data-[focused=true]:bg-default/60',
                      '!cursor-text',
                    ],
                  }}
                  placeholder="--Recherche generale"
                  startContent={<FontAwesomeIcon icon={faSearch} />}
                />
                {/* <Button className="" type="submit"></Button> */}
              </form>
            </NavbarItem>
            <NavbarItem>
              <NavLink
                exact="true"
                color="foreground"
                href="/"
                className=" flex items-center flex-col justify-center"
              >
                <FontAwesomeIcon icon={faBell} fontSize={20} />
                <span className="text-xs"> Notification</span>
              </NavLink>
            </NavbarItem>
            <NavbarItem>
              {/* <NavLink
            exact="true"
            href="/about"
            aria-current="page"
            color="secondary"
            className=" flex items-center flex-col justify-center"
          >
            <FontAwesomeIcon icon={faHeart} fontSize={20} />
            <span> Wishlist</span>
          </NavLink> */}
              <NavLink
                exact="true"
                className="relative flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-300"
                aria-label={`wishlist ${wishlist}`}
                href="/wishlist"
              >
                <div className="shop-counter absolute bottom-2 left-7  w-4 h-4 bg-myHeartColor rounded-full flex items-center justify-center text-white text-sm">
                  {wishlistTotalCount}
                </div>
                <FontAwesomeIcon
                  icon={faHeart}
                  className="hover:text-myHeartColor"
                  fontSize={20}
                />
              </NavLink>
              <span className="text-xs"> Wishlist</span>
            </NavbarItem>
            <NavbarItem>
              {/* <NavLink exact="true" color="foreground" href="/contact"> */}
              <NavLink
                exact="true"
                className="nav-link relative flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-300"
                aria-label="Shopping Cart. 0 items"
                href="/cart"
              >
                <div className="shop-counter absolute bottom-4   left-5  w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                  {cartTotalCount}
                </div>
                <FontAwesomeIcon fontSize={20} icon={faCartShopping} />
                <span className="ml-3">{totalPrice} MAD</span>
              </NavLink>

              {/* Panier
          </NavLink> */}
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            {isSignedIn ? (
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src={userImage}
              />
            ) : (
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src="/assets/login/unkownPerson.webp"
              />
            )}
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            {isSignedIn ? (
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{userEmail}</p>
              </DropdownItem>
            ) : (
              <DropdownItem key="SignIn" onClick={() => openSignIn()}>
                <FontAwesomeIcon icon={faSignInAlt} />
                <span className="font-semibold ml-1">Log in</span>
              </DropdownItem>
            )}
            {!isSignedIn && (
              <DropdownItem key="SignUp" onClick={() => openSignUp()}>
                <FontAwesomeIcon icon={faUserPlus} className="" />
                <span className="font-semibold ml-1">Sign Up</span>
              </DropdownItem>
            )}
            <DropdownItem
              key="my-orders"
              onClick={() => router.push('/myorders')}
            >
              <FontAwesomeIcon icon={faBagShopping} />
              <span className="ml-1">My orders</span>
            </DropdownItem>
            <DropdownItem
              key="dashboard"
              onClick={() => router.push('/dashboard')}
            >
              <div className="flex flex-row items-baseline">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill="currentColor"
                    d="M17 8h1v11H2V8h1V6c0-2.76 2.24-5 5-5c.71 0 1.39.15 2 .42A4.94 4.94 0 0 1 12 1c2.76 0 5 2.24 5 5zM5 6v2h2V6c0-1.13.39-2.16 1.02-3H8C6.35 3 5 4.35 5 6m10 2V6c0-1.65-1.35-3-3-3h-.02A4.98 4.98 0 0 1 13 6v2zm-5-4.22C9.39 4.33 9 5.12 9 6v2h2V6c0-.88-.39-1.67-1-2.22"
                  />
                </svg>
                <span className="ml-1">Dashboard</span>
              </div>
            </DropdownItem>
            <DropdownItem
              key="wishlist"
              onClick={() => {
                router.push('/wishlist');
              }}
            >
              <FontAwesomeIcon
                icon={faHeart}
                className="text-myHeartColor"
                fontSize={20}
              />{' '}
              <span>Wishlist</span>
            </DropdownItem>
            {isSignedIn === true && (
              <DropdownItem
                key="logout"
                color="danger"
                onClick={() => signOut(() => router.push('/'))}
              >
                <FontAwesomeIcon icon={faRightFromBracket} />
                <span className="ml-1">Log out</span>
              </DropdownItem>
            )}
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Nav>
  );
}
