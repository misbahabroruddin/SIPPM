"use client";

import Image from "next/image";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

import { ButtonStatus } from "@/components/button/button-status";
import { ContainerContent } from "@/components/container-content";
import {
  TimelineContent,
  TimelineHeader,
  TimelineItem,
} from "@/components/timeline";
import {
  convertDate,
  convertToDateNumeric,
  convertToTime,
} from "@/lib/utils/convertDate";
import { RiwayatPesanLPPM } from "./riwayat-pesan-lppm";
import { convertToRupiah } from "@/lib/utils/convertToRupiah";
import { SkeletonRiwayat } from "@/components/skeleton/skeleton-riwayat";

export const TrackRiwayatLPPM = ({ data, isLoading }) => {
  const [isOpen, setIsOpen] = useState();

  const updatedData = data ? data[0] : undefined;

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <SkeletonRiwayat />
      </div>
    );
  }

  return (
    <TimelineItem
      date={updatedData ? convertDate(updatedData?.updated_at, " ") : ""}
    >
      <TimelineHeader status={updatedData?.proposal?.status_lppm} />
      <TimelineContent isLoading={isLoading} className={"pb-4"}>
        <ContainerContent className="p-4">
          <div className="flex w-full flex-col  justify-between gap-2">
            <div className="flex grow font-[500] text-dark-80">
              <p>LPPM</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex grow items-center justify-between">
                <p className="text-dark-09">{updatedData?.user?.name}</p>
                <ButtonStatus
                  status={updatedData?.proposal?.status_lppm}
                  className="px-2 py-1 text-xs font-[500]"
                />
              </div>
              <p className="text-end font-semibold text-primary">
                {updatedData
                  ? convertToRupiah(updatedData?.dana_yang_disetujui)
                  : 0}
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-2">
              {data?.length ? (
                data?.map((item, index) => (
                  <div
                    className="overflow-hidden rounded-lg px-4 py-3 shadow-custom transition-all"
                    key={item.id}
                  >
                    <div className="flex justify-between">
                      <div className="flex max-w-[200px] items-center sm:max-w-[400px] md:max-w-[600px] lg:max-w-[800px]">
                        <Image
                          src="/icons/file.svg"
                          width={24}
                          height={24}
                          alt="file"
                        />
                        <Link
                          target="_blank"
                          href={item.file_proposal.url || ""}
                          className="hover:underline"
                        >
                          <p className="text-dark-09">
                            {item.file_proposal.nama ||
                              "Klik untuk lebih detail"}
                          </p>
                        </Link>
                      </div>
                      <div
                        className="flex grow items-center justify-end gap-2 text-dark-09"
                        role="button"
                        onClick={() =>
                          setIsOpen(isOpen === item.id ? null : item.id)
                        }
                      >
                        {isOpen !== item.id && (
                          <>
                            <div className="flex items-center gap-1 text-sm">
                              <Image
                                src="/icons/time.svg"
                                width={15}
                                height={16}
                                alt="file"
                              />
                              <p>{convertToTime(item.created_at)}</p>
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                              <Image
                                src="/icons/date.svg"
                                width={15}
                                height={16}
                                alt="file"
                              />
                              <p>{convertToDateNumeric(item.created_at)}</p>
                            </div>
                          </>
                        )}
                        <Image
                          src="/icons/chevron-down.svg"
                          width={24}
                          height={24}
                          alt="chevron"
                          className={twMerge(
                            "transition-all",
                            isOpen === item.id && "rotate-180",
                          )}
                        />
                      </div>
                    </div>
                    <div
                      className={twMerge(
                        "flex h-0 flex-col gap-1 transition-all",
                        isOpen === item.id && "h-fit",
                      )}
                    >
                      <RiwayatPesanLPPM
                        riwayatId={item?.id}
                        status={item?.status}
                        catatan={item?.catatan}
                        index={index}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-lg font-semibold text-secondary">
                  Belum ada riwayat
                </div>
              )}
            </div>
          </div>
        </ContainerContent>
      </TimelineContent>
    </TimelineItem>
  );
};
