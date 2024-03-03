"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { NavLink } from "../navlink";
// import Link from 'next/link';
import styled from "styled-components";
import { Button } from "@nextui-org/react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Input } from "@nextui-org/react";
// import { SearchIcon } from "./SearchIcon";
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
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
          <form
            className="flex relative items-center justify-center"
            role="search"
            id="rechercheGenerale"
          >
            {/* <Input
              key={"outside"}
              type="text"
              label="--Recherche generale"
              labelPlacement={"outside"}
              aria-label="General Search "
              bordered
              contentRightStyling={false}
              contentRight={
                <Button
                  auto
                  icon={faSearch} // Replace with actual icon and fill
                  onPress={() => console.log("Search")}
                />
              }
            /> */}
            <Input
              isClearable
              radius="lg"
              classNames={{
                label: "text-black/50 dark:text-white/90",
                input: [
                  "bg-transparent",
                  "text-black/90 dark:text-white/90",
                  "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                ],
                innerWrapper: "bg-transparent",
                inputWrapper: [
                  "shadow-xl",
                  "bg-default-200/50",
                  "dark:bg-default/60",
                  "backdrop-blur-xl",
                  "backdrop-saturate-200",
                  "hover:bg-default-200/70",
                  "dark:hover:bg-default/70",
                  "group-data-[focused=true]:bg-default-200/50",
                  "dark:group-data-[focused=true]:bg-default/60",
                  "!cursor-text",
                ],
              }}
              placeholder="--Recherche generale"
              startContent={<FontAwesomeIcon icon={faSearch} />}
            />
            {/* <Button className="" type="submit"></Button> */}
          </form>
        </NavbarItem>
        <NavbarItem>
          <NavLink exact="true" color="foreground" href="/">
            Notification
          </NavLink>
        </NavbarItem>

        <NavbarItem>
          <NavLink
            exact="true"
            href="/about"
            aria-current="page"
            color="secondary"
          >
            Wishlist
          </NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink exact="true" color="foreground" href="/contact">
            Contact
          </NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink exact="true" color="foreground" href="/contact">
            Panier
          </NavLink>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
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
      </NavbarContent>
    </Nav>
  );
}
