"use client";
import { useId } from "react";
import { Controller, useForm } from "react-hook-form";

import { ButtonCancel } from "@/components/button/button-cancel";
import { ButtonSave } from "@/components/button/button-save";
import { useQueryAnggotaMahasiswa } from "@/handlers/anggota/query-anggota-mahasiswa";
import { SingleSelect } from "@/components/select/single-select";
import { useAddAnggotaPenelitianLaporanHasil } from "@/handlers/dosen/laporan-hasil/penelitian/anggota/add-anggota-penelitian";

export const SelectMahasiswa = ({ onClose }) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const id = useId();

  const { data, isLoading } = useQueryAnggotaMahasiswa();

  const {
    onSubmitAnggotaMahasiswaPenelitian,
    isLoadingAnggotaMahasiswaPenelitian,
  } = useAddAnggotaPenelitianLaporanHasil(reset, onClose);

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={handleSubmit(onSubmitAnggotaMahasiswaPenelitian)}
    >
      <SingleSelect
        label={"Nama Mahasiswa"}
        Controller={Controller}
        control={control}
        options={data}
        placeholder={"Nama Mahasiswa"}
        name="anggota_id"
        errors={errors.anggota_id}
        rules={{ required: "Wajib diisi" }}
        id={id}
        isLoading={isLoading}
      />
      <div className="flex justify-center gap-6">
        <ButtonCancel iconLeft onClick={onClose} />
        <ButtonSave iconLeft disabled={isLoadingAnggotaMahasiswaPenelitian} />
      </div>
    </form>
  );
};
