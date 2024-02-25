"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

import { useGetProfile } from "@/handlers/biodata/query-get-profile";

export const Profile = () => {
  const { data: profile } = useGetProfile();
  const { data: session } = useSession();

  const avatar = () => {
    return session?.user.avatar;
  };

  return (
    <div className="flex h-fit basis-[318.87px] flex-col rounded-lg shadow-custom">
      <div className="flex flex-col items-center justify-center gap-2 border-b-[0.5px] border-[#CCCCCC] p-4">
        <Image
          className="inline-block rounded-full"
          src={avatar}
          width={280}
          height={280}
          alt="Profile"
        />
        <p className="mb-1 text-center text-2xl text-[#666666]">
          {profile?.name}
        </p>
      </div>
      <div className="flex flex-col gap-2 px-[18px] py-5">
        <h2 className="text-sm font-[500]">Details</h2>
        <div className="flex gap-2">
          <div className="flex flex-col gap-2 text-sm font-[500]">
            <p>Role</p>
            <p>Nama</p>
            <p>NIP</p>
            <p>Kontak</p>
            <p>Email</p>
          </div>
          <div className="flex flex-col gap-2 text-sm font-[500] text-[#666666]">
            {Array.from({ length: 5 }).map((_, index) => (
              <p key={index}>:</p>
            ))}
          </div>
          <div className="flex flex-col gap-2 text-sm font-[500] text-[#666666]">
            <p>{session?.user.roles[0].name}</p>
            <p>{profile?.nama_lengkap}</p>
            <p>{profile?.nidn_or_nidk_or_nim || "-"}</p>
            <p>{profile?.nomor_hp || "-"}</p>
            <p>{profile?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
