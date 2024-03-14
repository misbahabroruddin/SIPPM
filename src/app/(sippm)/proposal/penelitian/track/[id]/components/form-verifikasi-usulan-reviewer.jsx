"use client";

import { ButtonSubmit } from "@/components/button/button-submit";
import { Input } from "@/components/input/input";
import { Label } from "@/components/label";
import { SingleSelect } from "@/components/select/single-select";
import { useUpdateProposalPenelitianReviewer } from "@/handlers/lppm/penelitian/update-proposal-penelitian-reviewer";
import { useRouter } from "next/navigation";
import { useId } from "react";
import { Controller, useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";

export const FormVerifikasiUsulanReviewer = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
    setValue,
  } = useForm();
  const id = useId();
  const router = useRouter();

  const status = watch("status");

  if (status === "Diterima") {
    setValue("catatan", "");
  }
  const { mutateAsync: onSubmit, isPending: isLoading } =
    useUpdateProposalPenelitianReviewer(reset, router);

  const statusOptions = [
    {
      value: "Diterima",
      label: "Diterima",
    },
    {
      value: "Ditolak",
      label: "Ditolak",
    },
    {
      value: "Revisi",
      label: "Revisi",
    },
  ];
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      {/* <div className="flex flex-col gap-2">
        <Label
          htmlFor={"dana_yang_disetujui"}
          text={"Dana yang disetujui"}
          required
        />
        <Input
          containerClass="items-start"
          placeholder="Dana yang disetujui"
          type="number"
          register={register("dana_yang_disetujui", {
            required: "Dana yang disetujui harus diisi",
          })}
          errors={errors.dana_yang_disetujui}
          spanEmptyClass="hidden"
        />
      </div> */}
      <SingleSelect
        Controller={Controller}
        control={control}
        options={statusOptions}
        name="status"
        errors={errors.status}
        rules={{ required: "Status harus dipilih" }}
        placeholder="Status"
        spanEmptyClass="hidden"
        id={id}
      />
      <div
        className={twMerge(
          "flex flex-col gap-2",
          (status === "Diterima" || !status) && "hidden",
        )}
      >
        <Label htmlFor={"catatan"} text={"Catatan"} required />
        <textarea
          className="w-full resize-none rounded-lg border p-2 focus:outline focus:outline-primary"
          name="catatan"
          id="catatan"
          cols="30"
          placeholder="Tulis pesan..."
          {...register("catatan", {
            required: {
              value: status !== "Diterima" || !status ? true : false,
              message: "Catatan harus diisi",
            },
          })}
        />
        {errors.catatan && (
          <span className="text-sm text-red-500">
            * {errors.catatan.message}
          </span>
        )}
      </div>
      <ButtonSubmit className="mx-auto w-fit px-14" disabled={isLoading} />
    </form>
  );
};
