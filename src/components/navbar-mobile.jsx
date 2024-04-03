"use client";

import { useSidebar } from "@/lib/hooks/useSidebar";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

const Path = (props) => (
  <path
    fill="transparent"
    strokeWidth="3"
    stroke="black"
    strokeLinecap="round"
    {...props}
  />
);

const HamburgerMenu = ({ onClick, ...props }) => {
  return (
    <i
      className={twMerge("block cursor-pointer pr-2", props.className)}
      onClick={onClick}
    >
      <svg width="18" height="18" viewBox="0 0 23 18">
        <Path
          d="M 2 2.5 L 20 2.5"
          className="top"
          variants={{
            closed: { d: "M 2 2.5 L 20 2.5" },
            open: { d: "M 3 16.5 L 17 2.5" },
          }}
        />
        <Path d="M 2 9.423 L 20 9.423" opacity="1" className="middle" />
        <Path
          d="M 2 16.346 L 20 16.346"
          className="bottom"
          variants={{
            closed: { d: "M 2 16.346 L 20 16.346" },
            open: { d: "M 3 2.5 L 17 16.346" },
          }}
        />
      </svg>
    </i>
  );
};

const Chevron = ({ onClick, ...props }) => {
  return (
    <i
      className={twMerge("block cursor-pointer pr-2", props.className)}
      onClick={onClick}
    >
      <svg
        height="18"
        id="chevron-left"
        viewBox="0 0 32 32"
        width="18"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M20 1 L24 5 L14 16 L24 27 L20 31 L6 16 z" />
      </svg>
    </i>
  );
};

export const NavbarMobile = () => {
  const { isSidebarMobileOpen, toggleSidebarMobile } = useSidebar();

  return (
    <nav className="r-0 fixed top-0 z-[999] block w-full bg-white shadow lg:hidden">
      <div className="flex items-center justify-between px-2 py-3 lg:px-7 lg:py-4">
        <div
          className={twMerge(
            "flex w-[200px] items-center justify-start gap-2 px-2 transition-all duration-200",
            isSidebarMobileOpen ? "justify-between" : "",
          )}
        >
          {isSidebarMobileOpen ? (
            <>
              <Link href="/" className="transition-all duration-200">
                <div className="flex items-center gap-3">
                  <Image
                    src="/logo-unsia.png"
                    className="block w-[92px] lg:hidden"
                    width={92}
                    height={100}
                    alt="UNSIA"
                  />
                </div>
              </Link>
              <Chevron
                onClick={toggleSidebarMobile}
                className="block lg:hidden"
              />
            </>
          ) : (
            <HamburgerMenu onClick={toggleSidebarMobile} />
          )}
        </div>
        <div className="mr-[7px] block">
          <div className="flex w-fit items-center justify-between p-1 lg:p-2">
            <button
              onClick={() =>
                signOut({ redirect: false }).then(() => {
                  window.location.href = "https://sso.unsia.ac.id/home";
                })
              }
              className="flex w-fit items-center gap-2 rounded-lg border border-primary px-2 py-1"
            >
              <Image
                src="/icons/menu.svg"
                width={20}
                height={20}
                alt="menu"
                className="bg-white"
              />
              <span className="mt-[2px]">Menu</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
