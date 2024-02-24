"use client";

import Image from "next/image";
import Link from "next/link";

export const ListPengabdianDashboardLPPM = () => {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <ListItem key={index} />
      ))}
    </div>
  );
};

const ListItem = () => {
  return (
    <div className="rounded-lg px-6 py-4 shadow-custom">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="flex w-fit flex-col gap-1 lg:max-w-[631px]">
          <h2 className="text-lg">Judul Pengabdian</h2>
          <div className="flex gap-4">
            <div className="flex items-center gap-[2px]">
              <Image
                src="/icons/User.svg"
                height={24}
                width={24}
                alt="author"
              />
              <p className="text-sm text-[#999999]">
                {/* {data?.user.name || "Author"} */}
                Author
              </p>
            </div>
            <div className="flex items-center gap-[2px]">
              <Image
                src="/icons/Book.svg"
                height={24}
                width={24}
                alt="mata kuliah"
              />
              <p className="text-sm text-[#999999]">
                {/* {data?.user.biodata.program_studi.nama} */}
                prodi
              </p>
            </div>
            <div className="flex items-center gap-[2px]">
              <Image
                src="/icons/Clock.svg"
                height={24}
                width={24}
                alt="tanggal"
              />
              <p className="text-sm text-[#999999]">
                {/* {convertDate(data?.created_at)} */}
                tanggal
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-end gap-4">
          <Link
            // href={`/proposal/${currentTab || tabActive}/track/${data?.id}`}
            href={"#"}
          >
            <button
              className="rounded-lg bg-primary px-7 py-2 text-white disabled:cursor-not-allowed disabled:bg-gray-500"
              // disabled={data?.status_lppm === "Pending"}
            >
              Detail
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
