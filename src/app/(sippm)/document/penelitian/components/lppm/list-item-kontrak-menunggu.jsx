"use client";

import Image from "next/image";

import { convertDate } from "@/lib/utils/convertDate";
import { ModalUploadKontrakPenelitian } from "./modal-upload-kontrak-penelitian";

export const ListItemKontrakMenunggu = ({ data }) => {
  return (
    <div className="rounded-lg px-6 py-4 shadow-custom" key={data?.id}>
      <div className="flex flex-col gap-y-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex w-fit flex-col gap-1 lg:max-w-[731px]">
          <h2 className="text-base lg:text-lg">{data?.judul}</h2>
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <div className="flex items-center gap-[2px]">
                <Image
                  src="/icons/User.svg"
                  height={24}
                  width={24}
                  alt="author"
                  className="h-5 w-5 lg:h-6 lg:w-6"
                />
                <p className="text-xs text-[#999999] md:text-sm">
                  {data?.user?.name}
                </p>
              </div>
              <div className="flex items-center gap-[2px]">
                <Image
                  src="/icons/Clock.svg"
                  height={24}
                  width={24}
                  alt="tanggal"
                  className="h-5 w-5 lg:h-6 lg:w-6"
                />
                <p className="text-xs text-[#999999] md:text-sm">
                  {convertDate(data?.created_at)}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <div className="flex items-center gap-[2px]">
                <Image
                  src="/icons/Book.svg"
                  height={24}
                  width={24}
                  alt="Program studi"
                  className="h-5 w-5 lg:h-6 lg:w-6"
                />
                <p className="text-xs text-[#999999] md:text-sm">
                  {data?.user?.biodata?.program_studi?.nama}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-end gap-4">
          {!data?.dokumen_kontrak ? (
            <ModalUploadKontrakPenelitian penelitianId={data?.id} />
          ) : null}
        </div>
      </div>
    </div>
  );
};
