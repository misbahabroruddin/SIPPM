"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useForm } from "react-hook-form";

import { convertToDateNumeric, convertToTime } from "@/lib/utils/convertDate";
import { FormChat } from "@/components/form/form-chat";
import { useCreatePesanLPPM } from "@/handlers/lppm/riwayat/add-pesan-lppm";
import { useQueryGetRiwayatPesanReviewerLPPM } from "@/handlers/reviewer/riwayat/query-get-riwayat-pesan-lppm-reviewer";

export const RiwayatPesanLPPMReviewer = ({
  riwayatId,
  status,
  catatan,
  index,
}) => {
  const { data } = useQueryGetRiwayatPesanReviewerLPPM(riwayatId);
  const { data: session } = useSession();
  const { register, handleSubmit, reset } = useForm();
  const { onSubmitChat, isLoadingSubmit } = useCreatePesanLPPM(
    riwayatId,
    reset,
  );

  return (
    <>
      <div className="mb-2 mt-3 flex flex-col">
        <label className="text-sm font-semibold">Catatan :</label>
        <div className="sm:[400px] w-[300px] rounded-lg border p-2 md:w-[900px] lg:w-[1100px] xl:w-[1300px]">
          <p className="text">{catatan}</p>
        </div>
      </div>
      <div
        className={`rounded-lg border border-black-09 p-2 ${
          data?.length > 0 ? "" : "hidden"
        }`}
      >
        {data?.map((riwayat) => (
          <div className="mt-4 flex flex-col gap-1" key={riwayat?.id}>
            <div
              className={`flex ${
                riwayat?.user_id === session?.user?.id
                  ? "justify-end"
                  : "justify-start"
              } items-center gap-3 text-dark-09`}
            >
              <div className="flex items-center gap-1 text-sm">
                <Image
                  src="/icons/time.svg"
                  width={15}
                  height={16}
                  alt="file"
                />
                <p>{convertToTime(riwayat?.created_at)}</p>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Image
                  src="/icons/date.svg"
                  width={15}
                  height={16}
                  alt="file"
                />
                <p>{convertToDateNumeric(riwayat?.created_at)}</p>
              </div>
              <p className="text-sm">
                (
                {riwayat?.user_id === session?.user?.id
                  ? "Saya"
                  : riwayat?.user?.name || "NAMA REVIEWER"}
                )
              </p>
            </div>
            <div
              className={`w-full rounded ${
                riwayat?.user_id === session?.user?.id
                  ? "bg-green-09 text-end"
                  : "bg-sky text-start"
              } p-2`}
            >
              <p>{riwayat?.chat}</p>
            </div>
          </div>
        ))}
      </div>
      {status !== "Diterima" && index === 0 && (
        <FormChat
          onSubmit={handleSubmit(onSubmitChat)}
          register={register}
          disabled={isLoadingSubmit}
        />
      )}
    </>
  );
};
