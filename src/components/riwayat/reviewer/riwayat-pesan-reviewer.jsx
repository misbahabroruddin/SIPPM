"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useForm } from "react-hook-form";

import { convertToDateNumeric, convertToTime } from "@/lib/utils/convertDate";
import { FormChat } from "@/components/form/form-chat";
import { useQueryGetRiwayatPesanReviewer } from "@/handlers/reviewer/riwayat/query-get-riwayat-pesan-reviewer";
import { useCreatePesanReviewer } from "@/handlers/reviewer/riwayat/add-pesan-reviewer";

export const RiwayatPesanReviewer = ({ riwayatId, status, catatan, index }) => {
  const { data } = useQueryGetRiwayatPesanReviewer(riwayatId);
  const { data: session } = useSession();
  const { register, handleSubmit, reset } = useForm();
  const { onSubmitChat, isLoadingSubmit } = useCreatePesanReviewer(
    riwayatId,
    reset,
  );

  return (
    <>
      <div className="mb-2 mt-3 flex flex-col">
        <label className="text-sm font-semibold">Catatan :</label>
        <div className="border-black-09 h-16 rounded-lg border p-2">
          <p className="text">{catatan}</p>
        </div>
      </div>
      <div
        className={`border-black-09 rounded-lg border p-2 ${
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
                  : riwayat?.user?.name || ""}
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
