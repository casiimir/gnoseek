"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useClerk, useAuth, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

/**
 * Navbar component for navigation and user authentication
 * @returns {JSX.Element} The Navbar component
 */
const Navbar = (): JSX.Element => {
  const { openSignIn } = useClerk();
  const { isSignedIn } = useAuth();
  const pathname = usePathname();

  // State to keep track of the active navigation item
  const [activeNavItem, setActiveNavItem] = useState<string>(
    pathname === "/" ? "home" : ""
  );

  /**
   * Handles the sign-in process
   */
  const onHandleSignIn = (): void => {
    openSignIn();
  };

  /**
   * Updates the active navigation item
   * @param {string} navItem - The clicked navigation item
   */
  const handleNavItemClick = (navItem: string): void => {
    setActiveNavItem(navItem);
  };

  /**
   * Renders a navigation item
   * @param {string} href - The link destination
   * @param {string} src - The icon source
   * @param {string} alt - The icon alt text
   * @param {number} width - The icon width
   * @param {number} height - The icon height
   * @param {string} navItem - The navigation item name
   * @param {string} className - Additional CSS classes
   * @returns {JSX.Element} The navigation item
   */
  const renderNavItem = (
    href: string,
    src: string,
    alt: string,
    width: number,
    height: number,
    navItem: string,
    className: string
  ): JSX.Element => (
    <li className={className}>
      <Link href={href}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          onClick={() => handleNavItemClick(navItem)}
        />
      </Link>
    </li>
  );

  return (
    <nav className="fixed bottom-0 left-0 flex justify-center items-center gap-4 m-4 w-[calc(100%-2rem)] h-20 p-4 bg-asparagus-300 rounded-xl shadow-asparagus-400 shadow-sm z-10 md:flex-col md:w-20 md:h-[calc(100%-2rem)]">
      <ul className="flex items-center justify-center gap-2 h-full w-full md:flex-col sm:gap-4">
        {renderNavItem(
          "/about",
          "/icons/logo.svg",
          "Gnoseek logo",
          28,
          28,
          "home",
          `p-[3.6px] md:mt-9 ${pathname.includes("about") ? "bg-white rounded-full" : ""}`
        )}
        {renderNavItem(
          "/",
          "/icons/home.svg",
          "Homepage icon",
          24,
          24,
          "home",
          `p-[4.8px] ${pathname === "/" ? "bg-white rounded-full" : ""}`
        )}
        {renderNavItem(
          "/start",
          "/icons/explore.svg",
          "Exploration icon",
          26,
          26,
          "start",
          `p-[4px] ${
            pathname.includes("start") && !pathname.includes("library")
              ? "bg-white rounded-full"
              : ""
          }`
        )}
        {renderNavItem(
          "/dashboard",
          "/icons/dashboard.svg",
          "Dashboard icon",
          26,
          26,
          "dashboard",
          `p-[3px] ${
            isSignedIn && pathname === "/dashboard"
              ? "bg-white rounded-full"
              : ""
          } ${isSignedIn ? "opacity-100" : "opacity-30"}`
        )}
        {renderNavItem(
          isSignedIn ? `/start/library` : "/dashboard",
          "/icons/library.svg",
          "Library icon",
          22,
          22,
          "library",
          `p-[5px] ${
            pathname === "/start/library" ? "bg-white rounded-full" : ""
          } ${isSignedIn ? "opacity-100" : "opacity-30"}`
        )}
        {renderNavItem(
          "/search",
          "/icons/search.svg",
          "Search icon",
          22,
          22,
          "search",
          `p-[5px] ${pathname === "/search" ? "bg-white rounded-full" : ""}`
        )}
        {isSignedIn ? (
          <li className="md:mt-auto">
            <UserButton
              appearance={{
                elements: {
                  rootBox: {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  avatarBox: {
                    width: 28,
                    height: 28,
                  },
                  userButtonPopoverFooter: {
                    display: "none",
                  },
                },
              }}
            />
          </li>
        ) : (
          <li
            className={`cursor-pointer md:mt-auto md:pb-8`}
            onClick={onHandleSignIn}
          >
            <Image
              src="/icons/login.svg"
              alt="Login button"
              width={24}
              height={24}
              onClick={() => handleNavItemClick("login")}
            />
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
