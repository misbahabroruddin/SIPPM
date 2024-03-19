"use client";

import { useEffect, useId } from "react";
import { Controller, useForm } from "react-hook-form";

import { Input } from "@/components/input/input";
import { ButtonCancel } from "@/components/button/button-cancel";
import { ButtonSave } from "@/components/button/button-save";
import { useQueryJabatanFungsional } from "@/handlers/data-referensi/jabatan-fungsional/query-jabatan-fungsional";
import { useQueryProgramStudi } from "@/handlers/data-referensi/program-studi/query-program-studi";
import { EMAIL_REGEX } from "@/lib/constants/regex";
import { SingleSelect } from "@/components/select/single-select";
import { toast } from "react-toastify";
import { useAdministratorUpdateAnggotaDosen } from "@/handlers/anggota/administrator/update-anggota-dosen";
import { styles } from "@/lib/utils/style-react-select";

export const FormEditAnggotaDosen = ({
  anggotaId,
  setOpen,
  data,
  isLoading,
}) => {
  const id = useId();

  const {
    data: jabatanFungsionalOptions,
    isLoading: isLoadingJabatanFungsionalOptions,
  } = useQueryJabatanFungsional();

  const { data: programStudiOptions, isLoading: isLoadingProgramStudiOptions } =
    useQueryProgramStudi();

  const {
    register,
    reset,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const { mutateAsync, isPending } =
    useAdministratorUpdateAnggotaDosen(anggotaId);

  const onUpdateAnggotaDosen = async (data) => {
    try {
      await mutateAsync(data);
      setOpen(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onClose = () => {
    reset();
    setOpen(false);
  };

  const selectedJabatanFungsional = jabatanFungsionalOptions?.find(
    (jabatanFungsional) =>
      jabatanFungsional.value === data?.jabatan_fungsional_id,
  );

  const selectedProgramStudi = programStudiOptions?.find(
    (programStudi) => programStudi.value === data?.program_studi_id,
  );

  useEffect(() => {
    setValue("nik", data?.nik);
    setValue("nama_lengkap", data?.nama_lengkap);
    setValue("perguruan_tinggi", data?.perguruan_tinggi);
    setValue("nidn_or_nidk_or_nim", data?.nidn_or_nidk_or_nim);
    setValue("email", data?.email);
    setValue("jabatan_fungsional_id", data?.jabatan_fungsional_id);
    setValue("program_studi_id", data?.program_studi_id);
    setValue("nomor_hp", data?.nomor_hp);
    setValue("sinta_id", data?.sinta_id);
    setValue("google_scholar_id", data?.google_scholar_id);
  }, [data]);

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={handleSubmit(onUpdateAnggotaDosen)}
    >
      <Input
        type="number"
        label="NIK"
        name="nik"
        register={register("nik", { required: "wajib diisi" })}
        errors={errors.nik}
        placeholder="Nomor Induk Kependudukan"
        required
        disabled={isLoading}
      />
      <Input
        label="Nama Lengkap"
        name={"nama_lengkap"}
        register={register("nama_lengkap", {
          required: "wajib diisi",
        })}
        errors={errors.nama_lengkap}
        placeholder="Nama Lengkap"
        required
        disabled={isLoading}
      />
      <Input
        label="Perguruan Tinggi"
        name={"perguruan_tinggi"}
        register={register("perguruan_tinggi", { required: "wajib diisi" })}
        errors={errors.perguruan_tinggi}
        placeholder="Perguruan Tinggi"
        required
        disabled={isLoading}
      />
      <Input
        label="NIDN/NIDK"
        name={"nidn_or_nidk_or_nim"}
        placeholder="NIDN/NIDK"
        register={register("nidn_or_nidk_or_nim", { required: "wajib diisi" })}
        errors={errors.nidn_or_nidk_or_nim}
        required
        disabled={isLoading}
      />
      <SingleSelect
        label={"Jabatan Fungsional"}
        Controller={Controller}
        control={control}
        options={jabatanFungsionalOptions}
        placeholder={
          selectedJabatanFungsional
            ? selectedJabatanFungsional?.label
            : "Jabatan Fungsional"
        }
        name="jabatan_fungsional_id"
        errors={errors.jabatan_fungsional_id}
        rules={{ required: "Wajib diisi" }}
        id={id}
        isLoading={isLoadingJabatanFungsionalOptions}
        styles={styles(selectedJabatanFungsional)}
      />
      <SingleSelect
        label={"Program Studi"}
        Controller={Controller}
        control={control}
        options={programStudiOptions}
        placeholder={
          selectedProgramStudi ? selectedProgramStudi?.label : "Program Studi"
        }
        name="program_studi_id"
        errors={errors.program_studi_id}
        rules={{ required: "Wajib diisi" }}
        id={id}
        isLoading={isLoadingProgramStudiOptions}
        styles={styles(selectedProgramStudi)}
      />
      <Input
        label="Email"
        type="email"
        name={"email"}
        placeholder="Email"
        register={register("email", {
          required: "wajib diisi",
          pattern: {
            value: EMAIL_REGEX,
            message: "Email tidak valid",
          },
        })}
        errors={errors.email}
        required
        disabled={isLoading}
      />
      <Input
        label="Nomor hp"
        name={"nomor_hp"}
        placeholder="Nomor hp"
        register={register("nomor_hp", {
          required: "wajib diisi",
        })}
        errors={errors.nomor_hp}
        required
        disabled={isLoading}
      />
      <Input
        label="ID Sinta"
        name={"sinta_id"}
        placeholder="ID Sinta"
        register={register("sinta_id")}
        errors={errors.sinta_id}
        disabled={isLoading}
      />
      <Input
        label="ID Goggle Scholar"
        name={"google_scholar_id"}
        placeholder="ID Goggle Scholar"
        register={register("google_scholar_id")}
        errors={errors.google_scholar_id}
        disabled={isLoading}
      />
      <div className="mt-6 flex justify-center gap-6">
        <ButtonCancel iconLeft onClick={onClose} />
        <ButtonSave iconLeft disabled={isPending} isLoading={isPending} />
      </div>
    </form>
  );
};