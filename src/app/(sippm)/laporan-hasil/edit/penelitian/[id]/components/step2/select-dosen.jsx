"use client";
import { useId } from "react";
import { Controller, useForm } from "react-hook-form";

import { ButtonCancel } from "@/components/button/button-cancel";
import { ButtonSave } from "@/components/button/button-save";
import { useQueryOptionsAnggotaDosen } from "@/handlers/anggota/query-anggota-dosen";
import { SingleSelect } from "@/components/select/single-select";
import { useAddAnggotaPenelitianLaporanHasil } from "@/handlers/dosen/laporan-hasil/penelitian/anggota/add-anggota-penelitian";
import { useQueryAnggotaDosenLaporanHasilPenelitian } from "@/handlers/dosen/laporan-hasil/penelitian/anggota/query-anggota-dosen-penelitian";

export const SelectDosen = ({ onClose }) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const id = useId();

  const { data, isLoading } = useQueryOptionsAnggotaDosen();

  const { onSubmitAnggotaDosenPenelitian, isLoadingAnggotaDosenPenelitian } =
    useAddAnggotaPenelitianLaporanHasil(reset, onClose);

  const { listAnggotaDosenPenelitian } =
    useQueryAnggotaDosenLaporanHasilPenelitian();

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={handleSubmit(onSubmitAnggotaDosenPenelitian)}
    >
      <SingleSelect
        label={"Nama Dosen"}
        Controller={Controller}
        control={control}
        options={data?.filter(
          (anggota) =>
            !listAnggotaDosenPenelitian?.data.find(
              (a) => a.anggota_id === anggota.value,
            ),
        )}
        placeholder={"Nama Dosen"}
        name="anggota_id"
        errors={errors.anggota_id}
        rules={{ required: "Wajib diisi" }}
        id={id}
        isLoading={isLoading}
      />
      <div className="flex justify-center gap-6">
        <ButtonCancel iconLeft onClick={onClose} />
        <ButtonSave
          iconLeft
          disabled={isLoadingAnggotaDosenPenelitian}
          isLoading={isLoadingAnggotaDosenPenelitian}
        />
      </div>
    </form>
  );
};
