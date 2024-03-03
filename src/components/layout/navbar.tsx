"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { NavLink } from "../navlink";
// import Link from 'next/link';
import styled from "styled-components";

// const Nav = styled.nav`

//   z-index: 99;
//   a {
//     color: black;
//     &:hover {
//       color: blue;
//     }
//   }
//   a.active {
//     color: blue;
//   }
//   ul {
//     border-radius: 0px 0px 15px 15px;

// }
// `

// export default function Navbar({ user, setUser }) {
//   const wtspImage = '/assets/wtsp.svg';
//     const [isClicked, setIsClicked] = useState(false);
//     const [isNavVisible, setIsNavVisible] = useState(false); // State to control navbar visibility

//     const toggleNavbar = () => {
//         setIsNavVisible(prevState => !prevState); // Toggle the visibility

//       };
//   useEffect(() => {
//     if (isClicked) {
//       // Assuming you have a button with id='navbar-toggle' that controls the navbar visibility
//       const closeButton = document.querySelector('#navbar-toggle');
//       if (closeButton) closeButton.click();
//     }
//   }, [isClicked]);

//   return (
//     <div>
//       <Nav
//         className={` bg-white sticky top-0 border-gray-200 dark:bg-gray-900 custom-shadow`}
//         aria-label="Main Navigation"
//       >
//         <div className="max-w-screen-xl  flex flex-wrap items-center justify-between mx-auto p-4">
//           <NavLink exact={'true'} href="/" passHref className="flex items-center space-x-3 rtl:space-x-reverse">
//             {/* <a className="flex items-center space-x-3 rtl:space-x-reverse"> */}
//               <Image
//                 src="/assets/logo.png"
//                 alt="DipoDirect logo"
//                 width={70} // Specify width and height for Next.js Image component
//                 height={20}
//                 className="h-8 rounded-lg"
//               />
//               <span
//                 onClick={() => setIsClicked(true)}
//                 className="self-center text-xl font-semibold whitespace-nowrap text-myBrand hover:text-blue-400 delay-100"
//               >
//                 DipoDirect
//               </span>
//                       <button
//                           onClick={toggleNavbar} // Toggle navbar visibility on click

//             id="navbar-toggle"
//             data-collapse-toggle="navbar-default"
//             type="button"
//             className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
//             aria-controls="navbar-default"
//             aria-expanded={isNavVisible} // Reflect the current state
//           >
//             <span className="sr-only">Open main menu</span>
//             <svg
//               className="w-5 h-5"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 17 14"
//             >
//               <path
//                 stroke="currentColor"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M1 1h15M1 7h15M1 13h15"
//               />
//             </svg>
//           </button>
//           </NavLink>
//           {/* Toggle Button and other nav items */}
//           <div className={`w-full md:block md:w-auto ${isNavVisible ? '' : 'hidden'}`} id="navbar-default">
//             <ul className="flex flex-col p-4 md:flex-row md:space-x-8 md:mt-0">
//               {/* Link items */}
//               <li>
//                 <NavLink href="/" activeClassName='bg-myBrand !text-white md:!text-myBrand block py-2 px-3 rounded md:bg-transparent md:p-0 ' >
//                   <span className={`block py-2 px-3 rounded md:p-0 text-sm  `} >
//                     Accueil
//                   </span>
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink href="/about"  activeClassName='bg-myBrand !text-white md:!text-myBrand block py-2 px-3 rounded md:bg-transparent md:p-0 '>
//                   <span className={`block py-2 px-3 rounded md:p-0  text-sm `}>
//                     A propos
//                   </span>
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink href="/contact"  activeClassName='bg-myBrand !text-white md:!text-myBrand block py-2 px-3 rounded md:bg-transparent md:p-0 '>
//                   <span className={`block py-2 px-3 rounded md:p-0 text-sm  `}>
//                     Contact
//                   </span>
//                 </NavLink>
//               </li>

//                           <li>
//                 {user ? (
//                   <NavLink className={'text-sm'}  href="/login"  activeClassName='bg-myBrand !text-white md:!text-myBrand block py-2 px-3 rounded md:bg-transparent md:p-0 '
//                     onClick={() => {
//                       setIsClicked(true);
//                       localStorage.removeItem('user');
//                       setUser(null);
//                     }}

//                   >
//                     Se deconnecter
//                   </NavLink>
//                 ) : (
//                   <NavLink className={'text-sm'}
//                     onClick={() => setIsClicked(true)}

//                                       href="/login"  activeClassName='bg-myBrand !text-white md:!text-myBrand block py-2 px-3 rounded md:bg-transparent md:p-0 '

//                   >
//                     S'identifier
//                   </NavLink>
//                 )}
//               </li>
//               <li>
//                 <Link
//                   onClick={() => setIsClicked(true)}
//                   href="https://wa.me/212688698494"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className=" flex justify-center py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
//                   aria-label="Contact via WhatsApp"
//                 >
//                   <Image src={wtspImage} alt="Wtsp icon" width={18} height={18} />
//                 </Link>
//               </li>

//             </ul>
//           </div>
//         </div>
//       </Nav>
//     </div>
//   );
// }

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
