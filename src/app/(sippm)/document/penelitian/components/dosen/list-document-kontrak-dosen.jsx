"use client";
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

import { EmptyState } from "@/components/empty-state";
import { SkeletonListingProposal } from "@/components/skeleton/skeleton-listing-proposal";
import { Pagination } from "@/components/pagination";
import { ButtonDownload } from "@/components/button/button-download";
import { convertDate } from "@/lib/utils/convertDate";
import { ModalUploadKontrakPenelitian } from "./modal-upload-kontrak-penelitian";

export const ListPenelitianKontrakDosen = ({
  penelitian,
  isLoading,
  handlePageChange,
}) => {
  if (isLoading) return <SkeletonListingProposal />;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex h-[450px] flex-col gap-4 overflow-auto p-1 md:h-[500px] lg:h-[580px]">
        {penelitian?.data?.length ? (
          penelitian?.data?.map((proposal) => (
            <ListItemKontrak key={proposal.id} data={proposal} />
          ))
        ) : (
          <EmptyState />
        )}
      </div>
      {penelitian?.data?.length ? (
        <Pagination
          perPage={penelitian?.per_page}
          onPageChange={handlePageChange}
          pageCount={penelitian?.last_page}
          pageOffset={penelitian?.current_page - 1}
        />
      ) : null}
    </div>
  );
};

const ListItemKontrak = ({ data }) => {
  let buttonClass = "bg-red-07 text-white";

  if (data?.dokumen_kontrak?.status === "Menunggu") {
    buttonClass = "bg-red-07 text-white";
  } else if (data?.dokumen_kontrak?.status === "Diterima") {
    buttonClass = "bg-[#D5FACC] text-[#23B900]";
  } else if (data?.dokumen_kontrak?.status === "Dibalas") {
    buttonClass = "bg-sky-05 text-white";
  } else {
    buttonClass = "bg-[#CCCCCC] text-[#333333]";
  }
  return (
    <div className="rounded-lg px-6 py-4 shadow-custom" key={data?.id}>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="flex w-fit flex-col gap-1 lg:max-w-[731px]">
          <h2 className="text-lg">{data?.judul}</h2>
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <div className="flex items-center gap-[2px]">
                <Image
                  src="/icons/User.svg"
                  height={24}
                  width={24}
                  alt="author"
                  className="h-5 w-5"
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
                  className="h-5 w-5"
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
                  className="h-5 w-5"
                />
                <p className="text-xs text-[#999999] md:text-sm">
                  {data?.user?.biodata?.program_studi?.nama}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-end justify-center gap-4">
          {data?.dokumen_kontrak?.status === "Menunggu" ? (
            <div className="order-2 flex w-full flex-wrap items-center justify-center gap-2 lg:order-none lg:flex-nowrap lg:gap-4">
              <ModalUploadKontrakPenelitian
                penelitianId={data?.id}
                buttonClassName="w-full lg:w-fit justify-center px-2 py-1 md:px-4 gap-1 lg:gap-2"
              />
              <Link
                href={data?.dokumen_kontrak?.file_kontrak?.url}
                target="_blank"
                className="order-2 flex w-full items-center justify-center gap-2 rounded-lg bg-primary text-white disabled:cursor-not-allowed disabled:bg-gray-500 lg:order-none lg:w-fit"
              >
                <ButtonDownload className="px-2 py-1 md:px-4 md:py-2" />
              </Link>
            </div>
          ) : null}
          {data?.dokumen_kontrak?.status === "Dibalas" ? (
            <div className="order-2 flex w-full flex-wrap items-center justify-center gap-2 lg:order-none lg:flex-nowrap lg:gap-4">
              <ModalUploadKontrakPenelitian
                penelitianId={data?.id}
                buttonClassName="w-full lg:w-fit justify-center px-2 py-1 md:px-4 gap-1 lg:gap-2"
              />
              <Link
                href={data?.dokumen_kontrak?.file_kontrak?.url}
                target="_blank"
                className="order-2 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-2 py-1 text-white disabled:cursor-not-allowed disabled:bg-gray-500 md:px-4 md:py-2 lg:order-none lg:w-fit"
              >
                Detail
              </Link>
            </div>
          ) : null}
          {data?.dokumen_kontrak?.status === "Diterima" ? (
            <Link
              href={data?.dokumen_kontrak?.file_kontrak?.url}
              target="_blank"
              className="order-2 flex w-full items-center justify-center gap-2 rounded-lg bg-primary text-white disabled:cursor-not-allowed disabled:bg-gray-500 lg:order-none lg:w-fit"
            >
              <ButtonDownload className="px-2 py-1 md:px-4 md:py-2" />
            </Link>
          ) : null}
          <div className="order-1 flex flex-col items-center gap-[2px] px-8 font-[500] lg:order-none">
            <p className="text-sm text-primary">Status</p>
            <p className={twMerge("rounded-lg px-2 py-1", buttonClass)}>
              {data?.dokumen_kontrak?.status || "Kontrak Belum Ada"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
