"use client";

import { useId } from "react";
import { Controller, useForm } from "react-hook-form";

import { Input } from "@/components/input/input";
import { ButtonCancel } from "@/components/button/button-cancel";
import { ButtonSave } from "@/components/button/button-save";
import { useQueryJabatanFungsional } from "@/handlers/data-referensi/jabatan-fungsional/query-jabatan-fungsional";
import { useQueryProgramStudi } from "@/handlers/data-referensi/program-studi/query-program-studi";
import { EMAIL_REGEX } from "@/lib/constants/regex";
import { useCreateAnggotaDosen } from "@/handlers/anggota/create-anggota-dosen";
import { SingleSelect } from "@/components/select/single-select";
import { useAddAnggotaProposal } from "@/handlers/dosen/proposal/anggota/add-anggota";

export const FormTambahDosen = ({ onClose }) => {
  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const {
    data: jabatanFungsionalOptions,
    isLoading: isLoadingJabatanFungsionalOptions,
  } = useQueryJabatanFungsional();

  const { data: programStudiOptions, isLoading: isLoadingProgramStudiOptions } =
    useQueryProgramStudi();

  const id = useId();

  const { handleAddNewAnggota } = useAddAnggotaProposal();

  const { onCreateAnggotaDosen, isPending } = useCreateAnggotaDosen(
    reset,
    onClose,
    handleAddNewAnggota,
  );
  return (
    <div className="max-h-[calc(100vh-400px)] overflow-y-scroll p-2 lg:h-auto lg:overflow-auto">
      <form
        className="flex flex-col gap-2"
        onSubmit={handleSubmit(onCreateAnggotaDosen)}
      >
        <Input
          type="number"
          label="NIK"
          name="nik"
          labelClass={"text-sm font-[500] text-primary w-full lg:w-1/2"}
          register={register("nik", { required: "wajib diisi" })}
          errors={errors.nik}
          placeholder="Nomor Induk Kependudukan"
          required
        />
        <Input
          label="Nama Lengkap"
          name={"nama_lengkap"}
          labelClass={"text-sm font-[500] text-primary w-full lg:w-1/2"}
          register={register("nama_lengkap", {
            required: "wajib diisi",
          })}
          errors={errors.nama_lengkap}
          placeholder="Nama Lengkap"
          required
        />
        <Input
          label="Perguruan Tinggi"
          name={"perguruan_tinggi"}
          labelClass={"text-sm font-[500] text-primary w-full lg:w-1/2"}
          register={register("perguruan_tinggi", { required: "wajib diisi" })}
          errors={errors.perguruan_tinggi}
          placeholder="Perguruan Tinggi"
          required
        />
        <Input
          label="NIDN/NIDK"
          name={"nidn_or_nidk_or_nim"}
          placeholder="NIDN/NIDK"
          labelClass={"text-sm font-[500] text-primary w-full lg:w-1/2"}
          register={register("nidn_or_nidk_or_nim", {
            required: "wajib diisi",
          })}
          errors={errors.nidn_or_nidk_or_nim}
          required
        />
        <SingleSelect
          label={"Jabatan Fungsional"}
          Controller={Controller}
          control={control}
          options={jabatanFungsionalOptions}
          placeholder={"Jabatan Fungsional"}
          name="jabatan_fungsional_id"
          errors={errors.jabatan_fungsional_id}
          rules={{ required: "Wajib diisi" }}
          id={id}
          isLoading={isLoadingJabatanFungsionalOptions}
        />
        <SingleSelect
          label={"Program Studi"}
          Controller={Controller}
          control={control}
          options={programStudiOptions}
          placeholder={"Program Studi"}
          name="program_studi_id"
          errors={errors.program_studi_id}
          rules={{ required: "Wajib diisi" }}
          id={id}
          isLoading={isLoadingProgramStudiOptions}
        />
        <Input
          label="Email"
          type="email"
          name={"email"}
          placeholder="Email"
          labelClass={"text-sm font-[500] text-primary w-full lg:w-1/2"}
          register={register("email", {
            required: "wajib diisi",
            pattern: {
              value: EMAIL_REGEX,
              message: "Email tidak valid",
            },
          })}
          errors={errors.email}
          required
        />
        <Input
          label="Nomor hp"
          name={"nomor_hp"}
          placeholder="Nomor hp"
          labelClass={"text-sm font-[500] text-primary w-full lg:w-1/2"}
          register={register("nomor_hp", {
            required: "Wajib diisi",
          })}
          errors={errors.nomor_hp}
          required
        />
        <Input
          label="ID Sinta"
          name={"sinta_id"}
          placeholder="ID Sinta"
          labelClass={"text-sm font-[500] text-primary w-full lg:w-1/2"}
          register={register("sinta_id")}
          errors={errors.sinta_id}
        />
        <Input
          label="ID Goggle Scholar"
          name={"google_scholar_id"}
          placeholder="ID Goggle Scholar"
          labelClass={"text-sm font-[500] text-primary w-full lg:w-1/2"}
          register={register("google_scholar_id")}
          errors={errors.google_scholar_id}
        />
        <div className="mt-6 flex justify-center gap-6">
          <ButtonCancel iconLeft onClick={onClose} />
          <ButtonSave iconLeft disabled={isPending} isLoading={isPending} />
        </div>
      </form>
    </div>
  );
};
