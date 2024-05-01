"use client";

import Link from "next/link";
import Image from "next/image";

import { ButtonDownload } from "@/components/button/button-download";
import { convertDate } from "@/lib/utils/convertDate";
import { ModalUploadKontrakPenelitian } from "./modal-upload-kontrak-penelitian";

export const ListItemKontrakDibalas = ({ data }) => {
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
        <div className="flex flex-wrap items-end gap-4 lg:flex-nowrap">
          <ModalUploadKontrakPenelitian penelitianId={data?.id} />
          <Link
            href={data?.dokumen_kontrak?.file_kontrak?.url}
            target="_blank"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary text-white disabled:cursor-not-allowed disabled:bg-gray-500 lg:w-fit"
          >
            <ButtonDownload className="px-2 py-1 md:px-4 md:py-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};
