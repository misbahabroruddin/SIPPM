"use client";

import { useId } from "react";
import { Controller, useForm } from "react-hook-form";

import { Input } from "@/components/input/input";
import { ButtonCancel } from "@/components/button/button-cancel";
import { ButtonSave } from "@/components/button/button-save";
import { useQueryProgramStudi } from "@/handlers/data-referensi/program-studi/query-program-studi";
import { EMAIL_REGEX } from "@/lib/constants/regex";
import { useCreateAnggotaMahasiswa } from "@/handlers/anggota/create-anggota-mahasiswa";
import { SingleSelect } from "@/components/select/single-select";

export const FormTambahMahasiswa = ({ onClose }) => {
  const id = useId();

  const { data: programStudiOptions, isLoading: isLoadingProgramStudiOptions } =
    useQueryProgramStudi();

  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { onCreateAnggotaMahasiswa, isPending } = useCreateAnggotaMahasiswa(
    reset,
    onClose,
  );
  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={handleSubmit(onCreateAnggotaMahasiswa)}
    >
      <Input
        type="number"
        label="NIK"
        name="nik"
        register={register("nik", { required: "Wajib diisi" })}
        errors={errors.nik}
        placeholder="Nomor Induk Kependudukan"
        required
        spanEmptyClass="hidden"
      />
      <Input
        label="Nama Lengkap"
        name={"nama_lengkap"}
        register={register("nama_lengkap", {
          required: "Wajib diisi",
        })}
        errors={errors.nama_lengkap}
        placeholder="Nama Lengkap"
        required
        spanEmptyClass="hidden"
      />
      <Input
        label="Perguruan Tinggi"
        name={"perguruan_tinggi"}
        register={register("perguruan_tinggi", { required: "Wajib diisi" })}
        errors={errors.perguruan_tinggi}
        placeholder="Perguruan Tinggi"
        required
        spanEmptyClass="hidden"
      />
      <Input
        label="NIM"
        name={"nidn_or_nidk_or_nim"}
        placeholder="NIM"
        register={register("nidn_or_nidk_or_nim", { required: "Wajib diisi" })}
        errors={errors.nidn_or_nidk_or_nim}
        required
        spanEmptyClass="hidden"
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
        register={register("email", {
          required: "Wajib diisi",
          pattern: {
            value: EMAIL_REGEX,
            message: "Email tidak valid",
          },
        })}
        errors={errors.email}
        required
        spanEmptyClass="hidden"
      />
      <Input
        label="Nomor hp"
        name={"nomor_hp"}
        placeholder="Nomor hp"
        register={register("nomor_hp")}
        errors={errors.nomor_hp}
        required
        spanEmptyClass="hidden"
      />
      <Input
        label="ID Sinta"
        name={"sinta_id"}
        placeholder="ID Sinta"
        register={register("sinta_id")}
        errors={errors.sinta_id}
        spanEmptyClass="hidden"
      />
      <Input
        label="ID Goggle Scholar"
        name={"google_scholar_id"}
        placeholder="ID Goggle Scholar"
        register={register("google_scholar_id")}
        errors={errors.google_scholar_id}
        spanEmptyClass="hidden"
      />
      <div className="mt-6 flex justify-center gap-6">
        <ButtonCancel iconLeft onClick={onClose} />
        <ButtonSave iconLeft disabled={isPending} isLoading={isPending} />
      </div>
    </form>
  );
};
