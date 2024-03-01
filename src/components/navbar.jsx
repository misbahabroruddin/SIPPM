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

export const Navbar = () => {
  const { isOpen, toggleSidebar } = useSidebar();
  return (
    <nav className="r-0  fixed top-0 z-[999] w-full bg-white shadow">
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
                    src="/unsia.png"
                    className="hidden w-[92px] lg:block"
                    width={92}
                    height={100}
                    alt="UNSIA"
                  />
                  <Image
                    src="/logo-unsia.svg"
                    className="block w-auto lg:hidden"
                    width={25}
                    height={25}
                    alt="UNSIA"
                  />
                </div>
              </Link>
              <Chevron onClick={toggleSidebar} className="hidden lg:block " />
              <HamburgerMenu
                onClick={toggleSidebar}
                className="block lg:hidden"
              />
            </>
          ) : (
            <>
              <Link
                href="/"
                className="hidden transition-all duration-200 lg:block"
              >
                <Image
                  className="w-auto"
                  src="/logo-unsia.svg"
                  width={25}
                  height={25}
                  alt="UNSIA"
                />
              </Link>
              <HamburgerMenu onClick={toggleSidebar} />
            </>
          )}
        </div>
        <div className="mr-[7px] block">
          <div className="flex items-center justify-between p-2">
            <button
              onClick={() =>
                signOut({ redirect: false }).then(() => {
                  window.location.href = "/login";
                })
              }
              className="rounded border border-primary px-4 py-1 text-black hover:bg-primary hover:text-white"
            >
              Sign out
            </button>
            <div className="cursor-pointer px-1 py-[2px]">
              <Image
                className="hidden w-auto"
                src="/icons/notif.svg"
                width={19}
                height={16}
                alt="notif"
              />
            </div>
            <div className="mx-4 flex cursor-pointer gap-1 px-1 py-[2px] ">
              <Image
                className="hidden w-auto"
                src="/icons/globe.svg"
                width={19}
                height={16}
                alt="notif"
              />
              <div className=" hidden items-center">
                <p className="text-xl font-[500] text-[#666666]">EN</p>
              </div>
              <Image
                src="/icons/arrow.svg"
                width={12}
                height={7}
                alt="notif"
                className="hidden"
              />
            </div>
            <div className="cursor-pointer px-1 py-[2px]">
              <Image
                className="hidden w-auto"
                src="/icons/setting.svg"
                width={19}
                height={16}
                alt="notif"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
