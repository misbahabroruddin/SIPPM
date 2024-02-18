"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

export const ProfileSidebar = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <ProfileSidebarSkeleton />;
  }

  return (
    <div className='flex items-center bg-[#0D3A62] rounded-lg'>
      <div className='flex items-center gap-2 py-3 pl-2'>
        {session?.user.avatar && (
          <Image
            className='inline-block rounded-full'
            src={session?.user.avatar}
            width={40}
            height={40}
            alt='Profile'
          />
        )}
        <div className='block text-white'>
          <p className='font-[500] text-[14px]'>{session?.user.name}</p>
          <p className='font-normal text-[12px]'>{session?.user.username}</p>
        </div>
      </div>
    </div>
  );
};

function ProfileSidebarSkeleton() {
  return (
    <div className='flex animate-pulse items-center gap-2 bg-[#0D3A62] rounded-lg py-4 pl-2'>
      <div className='grid h-10 w-10 place-items-center rounded-full bg-gray-300 '></div>
      <div className='flex flex-col gap-3 py-[2px]'>
        <div className='h-4 w-24 rounded bg-gray-300'></div>
        <div className='h-4 w-24 rounded bg-gray-300'></div>
      </div>
    </div>
  );
}
