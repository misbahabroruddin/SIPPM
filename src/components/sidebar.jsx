"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useSelectedLayoutSegments } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { ProfileSidebar } from "./profile-sidebar";
import { useSidebar } from "@/lib/hooks/useSidebar";
import { useSidebarMenu } from "@/lib/hooks/useMenuSidebar";

export const Sidebar = () => {
  const pathname = usePathname();
  const page = useSelectedLayoutSegments();
  const { isOpen } = useSidebar();
  const { data: session } = useSession();
  const menus = useSidebarMenu(session);
  const [open, setOpen] = useState(null);

  useEffect(() => {
    if (pathname.includes("/data-referensi")) {
      return setOpen("/data-referensi");
    } else if (pathname.includes("/document")) {
      return setOpen("/document");
    } else if (pathname.includes("/anggota")) {
      return setOpen("/anggota");
    }

    setOpen(null);
  }, [pathname]);

  return (
    <aside
      className={`fixed -left-full z-50 min-h-dvh w-full max-w-[256px] bg-primary transition-all
        ${isOpen ? "duration-300 lg:left-0 lg:block" : "block  duration-200"}
      `}
    >
      <div className="flex flex-col gap-2 p-4">
        <ProfileSidebar />
        <ul className="flex flex-col gap-1">
          {menus?.map((menu) =>
            menu.children ? (
              <li key={menu.link}>
                <button
                  className={`mt-2 flex w-full items-center justify-between gap-2 rounded-lg p-2 text-white hover:bg-secondary ${
                    page.includes(menu.link?.slice(1)) || pathname === menu.link
                      ? "bg-secondary"
                      : null
                  }`}
                  onClick={() => {
                    setOpen(open === menu.link ? null : menu.link);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src={menu.icon}
                      width={24}
                      height={24}
                      alt={menu.label}
                    />
                    <p className="text-sm font-[500]">{menu.label}</p>
                  </div>
                  <Image
                    src="/icons/chevron-right.svg"
                    width={24}
                    height={24}
                    alt="chevron"
                    className={twMerge(
                      "transition-all",
                      open === menu.link ? "rotate-90" : "",
                    )}
                  />
                </button>
                <ul
                  className={twMerge(
                    "ease-in-ou mt-1 flex flex-col gap-1 overflow-hidden transition duration-500",
                    open === menu.link
                      ? "h-auto transition-transform"
                      : "h-0 transition-transform",
                  )}
                >
                  {menu.children.map((child) => (
                    <li key={child.link} className=" pl-4 transition-transform">
                      <Link
                        href={child.link}
                        className={`flex items-center gap-2 rounded-lg p-2 text-white hover:bg-secondary ${
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
                        <p className="text-sm font-[500]">{child.label}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={menu.link} className="transition-transform">
                <Link
                  href={menu.link}
                  className={`flex items-center gap-2 rounded-lg p-2 text-white hover:bg-secondary ${
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
                  <p className="text-sm font-[500]">{menu.label}</p>
                </Link>
              </li>
            ),
          )}
        </ul>
      </div>
    </aside>
  );
};
