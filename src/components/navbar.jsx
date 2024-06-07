"use client";

import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

import { useSidebar } from "@/lib/hooks/useSidebar";
import { ProfileMenuNavbar } from "./profile-menu-navbar";

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
        height="14"
        id="chevron-left"
        viewBox="0 0 32 32"
        width="14"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M20 1 L24 5 L14 16 L24 27 L20 31 L6 16 z" />
      </svg>
    </i>
  );
};

export const Navbar = () => {
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <nav className="r-0  fixed top-0 z-[999] hidden w-full bg-white shadow lg:block">
      <div className="flex items-center justify-between px-7 py-4">
        <div
          className={twMerge(
            "flex w-[236px] items-center justify-start gap-2 px-2 transition-all duration-200 lg:gap-3",
            isOpen ? "lg:justify-between" : "",
          )}
        >
          {isOpen ? (
            <>
              <Link href="/" className="transition-all duration-200">
                <div className="flex items-center gap-3">
                  <Image
                    src="/logo-unsia.png"
                    className="hidden w-[92px] lg:block"
                    width={92}
                    height={107}
                    alt="UNSIA"
                  />
                </div>
              </Link>
              <Chevron onClick={toggleSidebar} className="hidden lg:block " />
            </>
          ) : (
            <>
              <Link
                href="/"
                className="hidden transition-all duration-200 lg:block"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src="/logo-unsia.svg"
                    className="block w-6"
                    width={25}
                    height={25}
                    alt="UNSIA"
                  />
                </div>
              </Link>
              <HamburgerMenu onClick={toggleSidebar} />
            </>
          )}
        </div>
        <div className="mr-8 block">
          <ProfileMenuNavbar />
        </div>
      </div>
    </nav>
  );
};
