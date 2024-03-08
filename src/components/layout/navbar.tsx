"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { NavLink } from "../navlink";
// import Link from 'next/link';
import styled from "styled-components";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  UserProfile,
  useUser,
} from "@clerk/nextjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import Cart from "@/app/cart/page";
import MyButton from "../common/myButton";
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

export default function App() {
  const path = usePathname();

  const libraries = ["/", "/arrissala", "/aladnane"];
  const correctPath = libraries.some((l) => l === path);
  // this is the path where i want to render the navbar
  if (!correctPath) {
    return;
  }
  const DotIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        fill="currentColor"
      >
        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
      </svg>
    );
  };

  const CustomPage = () => {
    return (
      <div>
        <h1>Custom Profile Page</h1>
        <p>This is the custom profile page</p>
      </div>
    );
  };
  const { isLoaded, isSignedIn, user } = useUser();
  console.log(user?.emailAddresses[0].emailAddress);
  console.log(isLoaded);
  console.log(isSignedIn);

  return (
    <Nav>
      <NavbarBrand>
        <NavLink exact="true" href="/" className="flex flex-row">
          <AcmeLogo />
          <p className=" ml-1 font-bold text-inherit self-center text-xl  whitespace-nowrap text-myBrand hover:text-blue-400 delay-100">
            {" "}
            DipoDirect
          </p>
        </NavLink>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
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
      </NavbarContent>

      {/* <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="/assets/avatar.png"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">anass.abounouar@gmail.com</p>
            </DropdownItem>
            <DropdownItem key="cart" href="/cart">
              Cart
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent> */}
      <SignedIn>
        {/* Mount the UserButton component */}
        <UserButton afterSignOutUrl="/">
          <UserButton.UserProfilePage
            label="Custom Page"
            url="custom"
            labelIcon={<DotIcon />}
          >
            <Cart />
          </UserButton.UserProfilePage>

          {/* You can also pass the content as direct children */}
          {/* <UserButton.UserProfilePage
            label="Terms"
            labelIcon={<DotIcon />}
            url="terms"
          >
            <div>
              <h1>Custom Terms Page</h1>
              <p>This is the custom terms page</p>
            </div>
          </UserButton.UserProfilePage> */}
        </UserButton>
      </SignedIn>
      <SignedOut>
        {/* Signed out users get sign in button */}
        <SignInButton>
          <MyButton
            height="30"
            text="sign-in"
            className="bg-myBrand text-white"
          >
            Sign in
          </MyButton>
        </SignInButton>
      </SignedOut>

      {/* {isLoaded && isSignedIn && <UserButton showName={false} />} */}
    </Nav>
  );
}
