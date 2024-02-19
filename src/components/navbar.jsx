"use client";

import { useSidebar } from "@/lib/hooks/useSidebar";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

const Path = (props) => (
  <path
    fill='transparent'
    strokeWidth='3'
    stroke='black'
    strokeLinecap='round'
    {...props}
  />
);

const HamburgerMenu = ({ onClick, ...props }) => {
  return (
    <i
      className={twMerge("block cursor-pointer pr-2", props.className)}
      onClick={onClick}
    >
      <svg width='18' height='18' viewBox='0 0 23 18'>
        <Path
          d='M 2 2.5 L 20 2.5'
          className='top'
          variants={{
            closed: { d: "M 2 2.5 L 20 2.5" },
            open: { d: "M 3 16.5 L 17 2.5" },
          }}
        />
        <Path d='M 2 9.423 L 20 9.423' opacity='1' className='middle' />
        <Path
          d='M 2 16.346 L 20 16.346'
          className='bottom'
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
        height='18'
        id='chevron-left'
        viewBox='0 0 32 32'
        width='18'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M20 1 L24 5 L14 16 L24 27 L20 31 L6 16 z' />
      </svg>
    </i>
  );
};

export const Navbar = () => {
  const { isOpen, toggleSidebar } = useSidebar();
  return (
    <nav className='shadow  fixed top-0 r-0 bg-white w-full z-50'>
      <div className='flex justify-between items-center py-4 px-7'>
        <div
          className={twMerge(
            "flex items-center gap-2 lg:gap-3 px-2 w-[236px] transition-all duration-200 justify-start",
            isOpen ? "lg:justify-between" : ""
          )}
        >
          {isOpen ? (
            <>
              <Link href='/' className='transition-all duration-200'>
                <div className='flex gap-3 items-center'>
                  <Image
                    src='/unsia.png'
                    className='hidden lg:block w-auto'
                    width={92}
                    height={100}
                    alt='UNSIA'
                  />
                  <Image
                    src='/logo-unsia.svg'
                    className='block lg:hidden w-auto'
                    width={25}
                    height={25}
                    alt='UNSIA'
                  />
                </div>
              </Link>
              <Chevron onClick={toggleSidebar} className='hidden lg:block ' />
              <HamburgerMenu
                onClick={toggleSidebar}
                className='block lg:hidden'
              />
            </>
          ) : (
            <>
              <Link
                href='/'
                className='transition-all duration-200 hidden lg:block'
              >
                <Image
                  className='w-auto'
                  src='/logo-unsia.svg'
                  width={25}
                  height={25}
                  alt='UNSIA'
                />
              </Link>
              <HamburgerMenu onClick={toggleSidebar} />
            </>
          )}
        </div>
        <div className='block mr-[7px]'>
          <div className='flex items-center justify-between p-2'>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className='px-4 py-1 rounded border border-primary text-black hover:bg-primary hover:text-white'
            >
              Sign out
            </button>
            <div className='px-1 py-[2px] cursor-pointer'>
              <Image
                className='w-auto hidden'
                src='/icons/notif.svg'
                width={19}
                height={16}
                alt='notif'
              />
            </div>
            <div className='flex gap-1 px-1 py-[2px] mx-4 cursor-pointer '>
              <Image
                className='w-auto hidden'
                src='/icons/globe.svg'
                width={19}
                height={16}
                alt='notif'
              />
              <div className=' items-center hidden'>
                <p className='font-[500] text-xl text-[#666666]'>EN</p>
              </div>
              <Image
                src='/icons/arrow.svg'
                width={12}
                height={7}
                alt='notif'
                className='hidden'
              />
            </div>
            <div className='px-1 py-[2px] cursor-pointer'>
              <Image
                className='w-auto hidden'
                src='/icons/setting.svg'
                width={19}
                height={16}
                alt='notif'
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
