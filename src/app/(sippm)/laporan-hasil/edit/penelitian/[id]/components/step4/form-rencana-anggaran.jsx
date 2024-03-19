"use client";

import { useForm } from "react-hook-form";

import { Input } from "@/components/input/input";
import { ButtonCancel } from "@/components/button/button-cancel";
import { ButtonSave } from "@/components/button/button-save";
import { useEffect } from "react";
import { useAddEditRencanaAnggaranLaporanHasilPenelitian } from "@/handlers/dosen/laporan-hasil/penelitian/rencana-anggaran/add-edit-rencana-anggaran";

export const FormRencanaAnggaran = ({ onClose, id, data }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const { onSubmitRencanaAnggaran, isLoadingRencanaAnggaran } =
    useAddEditRencanaAnggaranLaporanHasilPenelitian(id, reset, onClose);

  useEffect(() => {
    if (data) {
      setValue("rincian", data?.rincian);
      setValue("biaya", data?.biaya);
    }
  }, [data]);

  return (
    <form
      className="flex flex-col gap-3 px-3"
      onSubmit={handleSubmit(onSubmitRencanaAnggaran)}
    >
      <Input
        containerClass="flex-col items-start gap-2"
        labelClass="text-start"
        label="Rincian"
        name={"rincian"}
        placeholder="Rincian"
        register={register("rincian", {
          required: "harus diisi",
        })}
        errors={errors.rincian}
        required
        defaultValue={data?.rincian}
        spanEmptyClass="hidden"
      />
      <Input
        containerClass="flex-col items-start gap-2"
        labelClass="text-start"
        type="number"
        label="Biaya"
        name="biaya"
        placeholder="Biaya"
        register={register("biaya", {
          required: "harus diisi",
        })}
        errors={errors.biaya}
        required
        defaultValue={data?.biaya}
        spanEmptyClass="hidden"
      />
      <div className="my-2 flex justify-center gap-4">
        <ButtonCancel className="w-36 lg:w-40" iconLeft onClick={onClose} />
        <ButtonSave
          className="w-36 lg:w-40"
          iconLeft
          disabled={isLoadingRencanaAnggaran}
          isLoading={isLoadingRencanaAnggaran}
        />
      </div>
    </form>
  );
};
