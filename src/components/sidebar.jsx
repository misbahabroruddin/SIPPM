"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useSelectedLayoutSegments } from "next/navigation";
import { useState } from "react";

import { ProfileSidebar } from "./profile-sidebar";
import { useSidebar } from "@/lib/hooks/useSidebar";
import { useSession } from "next-auth/react";
import { useSidebarMenu } from "@/lib/hooks/useMenuSidebar";
import { twMerge } from "tailwind-merge";

export const Sidebar = () => {
  const pathname = usePathname();
  const page = useSelectedLayoutSegments();
  const { isOpen } = useSidebar();
  const { data: session } = useSession();
  const menus = useSidebarMenu(session);
  const [open, setOpen] = useState(null);

  return (
    <aside
      className={`max-w-[256px] w-full transition-all bg-primary min-h-dvh -left-full fixed z-50
        ${isOpen ? "lg:block lg:left-0 duration-300" : "block  duration-200"}
      `}
    >
      <div className='flex flex-col gap-2 p-4'>
        <ProfileSidebar />
        <ul className='flex flex-col gap-1'>
          {menus?.map((menu) =>
            menu.children ? (
              <li key={menu.link}>
                <button
                  className={`flex justify-between items-center gap-2 p-2 text-white hover:bg-secondary rounded-lg w-full ${
                    page.includes(menu.link?.slice(1)) || pathname === menu.link
                      ? "bg-secondary"
                      : null
                  }`}
                  onClick={() => setOpen(open === menu.link ? null : menu.link)}
                >
                  <div className='flex items-center gap-2'>
                    <Image
                      src={menu.icon}
                      width={24}
                      height={24}
                      alt={menu.label}
                    />
                    <p className='font-[500] text-sm'>{menu.label}</p>
                  </div>
                  <Image
                    src='/icons/chevron-right.svg'
                    width={24}
                    height={24}
                    alt='chevron'
                    className={twMerge(
                      "transition-all",
                      open ? "rotate-90" : ""
                    )}
                  />
                </button>
                <ul
                  className={twMerge(
                    "flex flex-col gap-1 overflow-hidden transition ease-in-out duration-500",
                    open
                      ? "h-auto transition-transform"
                      : "h-0 transition-transform"
                  )}
                >
                  {menu.children.map((child) => (
                    <li key={child.link} className=' pl-4 transition-transform'>
                      <Link
                        href={child.link}
                        className={`flex items-center gap-2 p-2 text-white hover:bg-secondary rounded-lg ${
                          page.includes(child.link?.slice(1)) ||
                          pathname === child.link
                            ? "bg-secondary"
                            : null
                        }`}
                      >
                        <Image
                          src={child.icon}
                          width={24}
                          height={24}
                          alt={child.label}
                        />
                        <p className='font-[500] text-sm'>{child.label}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={menu.link} className='transition-transform'>
                <Link
                  href={menu.link}
                  className={`flex items-center gap-2 p-2 text-white hover:bg-secondary rounded-lg ${
                    page.includes(menu.link?.slice(1)) || pathname === menu.link
                      ? "bg-secondary"
                      : null
                  }`}
                >
                  <Image
                    src={menu.icon}
                    width={24}
                    height={24}
                    alt={menu.label}
                  />
                  <p className='font-[500] text-sm'>{menu.label}</p>
                </Link>
              </li>
            )
          )}
        </ul>
      </div>
    </aside>
  );
};
