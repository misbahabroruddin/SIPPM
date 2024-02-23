"use client";
import { useId } from "react";
import { Controller, useForm } from "react-hook-form";

import { ButtonCancel } from "@/components/button/button-cancel";
import { ButtonSave } from "@/components/button/button-save";
import { useAddAnggotaPenelitian } from "@/handlers/penelitian/anggota/add-anggota-penelitian";
import { useQueryAnggotaDosen } from "@/handlers/anggota/query-anggota-dosen";
import { SingleSelect } from "@/components/select/single-select";

export const SelectDosen = ({ onClose }) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const id = useId();
  const { data, isLoading } = useQueryAnggotaDosen();
  const { onSubmitAnggotaDosenPenelitian, isLoadingAnggotaDosenPenelitian } =
    useAddAnggotaPenelitian(reset, onClose);
  return (
    <form
      className='flex flex-col gap-6'
      onSubmit={handleSubmit(onSubmitAnggotaDosenPenelitian)}
    >
      <SingleSelect
        label={"Nama Dosen"}
        Controller={Controller}
        control={control}
        options={data}
        placeholder={"Nama Dosen"}
        name='anggota_id'
        errors={errors.anggota_id}
        rules={{ required: "Wajib diisi" }}
        id={id}
        isLoading={isLoading}
      />
      <div className='flex justify-center gap-6'>
        <ButtonCancel iconLeft onClick={onClose} />
        <ButtonSave iconLeft disabled={isLoadingAnggotaDosenPenelitian} />
      </div>
    </form>
  );
};
