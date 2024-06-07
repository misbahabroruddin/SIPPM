"use client";

import { Avatar } from "@material-tailwind/react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { useState } from "react";
import Link from "next/link";

import { ChevronDown } from "./svgs/chevron-down";
import { SignOutIcon } from "./svgs/signout";
import { DOSEN } from "@/lib/constants/role";

export const ProfileMenuNavbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { data: session, status } = useSession();

  const role = session?.user?.roles[0].name;

  if (status === "loading") {
    return <ProfileMenuNavbarSkeleton />;
  }

  return (
    <div className="flex items-center justify-between">
      <Menu handler={setOpenMenu} open={openMenu}>
        <MenuHandler>
          <div
            className={`flex items-center gap-[6px] px-3 py-2 ${openMenu ? "rounded-lg bg-gray-100" : "bg-none"}`}
            role="button"
          >
            <Avatar
              src={session?.user?.avatar}
              alt="Profile"
              className="h-8 w-8"
            />
            <div className="flex">
              <div className="line-clamp-1 min-w-fit max-w-28 text-[14px] font-[500]">
                <p>{session?.user.name}</p>
              </div>
              <ChevronDown
                className={`pr-0 transition-transform ${
                  openMenu ? "rotate-180" : ""
                }`}
              />
            </div>
          </div>
        </MenuHandler>
        <MenuList className="flex w-32 flex-col gap-2 p-2">
          {role === DOSEN ? (
            <MenuItem className={`w-full px-2 py-1 text-primary`}>
              <Link
                href={"/biodata"}
                className={`flex items-center gap-2 rounded-lg `}
              >
                <Image
                  src={"/icons/biodata-black.svg"}
                  width={24}
                  height={24}
                  alt={"Biodata"}
                />
                <p className="text-sm font-[500] ">{"Biodata"}</p>
              </Link>
            </MenuItem>
          ) : null}

          <MenuItem className="w-full px-2 py-1 text-primary">
            <div
              onClick={() =>
                signOut({ redirect: false }).then(() => {
                  window.location.href = "https://sso.dev-unsia.id/home";
                })
              }
              className="flex items-center gap-2 rounded-lg"
              role="button"
            >
              <SignOutIcon height={20} width={20} />
              <p className="text-sm font-[500]">Menu</p>
            </div>
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
};

function ProfileMenuNavbarSkeleton() {
  return (
    <div className="flex animate-pulse items-center gap-2 rounded-lg bg-[#0D3A62] py-4 pl-2">
      <div className="grid h-10 w-10 place-items-center rounded-full bg-gray-300 "></div>
      <div className="flex flex-col gap-3 py-[2px]">
        <div className="h-4 w-24 rounded bg-gray-300"></div>
        <div className="h-4 w-24 rounded bg-gray-300"></div>
      </div>
    </div>
  );
}
