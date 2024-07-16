"use client";

import { useId } from "react";
import { Controller, useForm } from "react-hook-form";

import { ButtonCancel } from "@/components/button/button-cancel";
import { ButtonSave } from "@/components/button/button-save";
import { useQueryAnggotaMahasiswa } from "@/handlers/anggota/query-anggota-mahasiswa";
import { SingleSelect } from "@/components/select/single-select";
import { useAddAnggotaProposal } from "@/handlers/dosen/proposal/anggota/add-anggota";
import { useQueryAnggotaMahasiswaProposal } from "@/handlers/dosen/proposal/anggota/query-anggota-mahasiswa";

export const SelectMahasiswa = ({ onClose }) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const id = useId();

  const { data, isLoading } = useQueryAnggotaMahasiswa();

  const { onSubmitAnggotaMahasiswa, isLoadingAnggotaMahasiswa } =
    useAddAnggotaProposal(reset, onClose);

  const { data: listAnggotaMahasiswaPenelitian } =
    useQueryAnggotaMahasiswaProposal();

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={handleSubmit(onSubmitAnggotaMahasiswa)}
    >
      <SingleSelect
        label={"Nama Mahasiswa"}
        Controller={Controller}
        control={control}
        options={data?.filter(
          (anggota) =>
            !listAnggotaMahasiswaPenelitian?.data.find(
              (a) => a.anggota_id === anggota.value,
            ),
        )}
        placeholder={"Nama Mahasiswa"}
        name="anggota_id"
        errors={errors.anggota_id}
        rules={{ required: "Wajib diisi" }}
        id={id}
        isLoading={isLoading}
        maxMenuHeight={180}
      />
      <div className="flex justify-center gap-6">
        <ButtonCancel iconLeft onClick={onClose} />
        <ButtonSave
          iconLeft
          disabled={isLoadingAnggotaMahasiswa}
          isLoading={isLoadingAnggotaMahasiswa}
        />
      </div>
    </form>
  );
};
