"use client";
import { useForm } from "react-hook-form";

import { ButtonCancel } from "@/components/button/button-cancel";
import { ButtonSave } from "@/components/button/button-save";
import { Input } from "@/components/input/input";
import { useEffect } from "react";
import { useQueryEditKabupaten } from "@/handlers/data-referensi/kabupaten/administator/edit-kabupaten";

export const FormEditKabupaten = ({ id, setOpen, data, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  const onClose = () => {
    setOpen(false);
  };

  const { mutateAsync, isPending } = useQueryEditKabupaten(id);

  useEffect(() => {
    setValue("nama", data?.nama);
    setValue("kode", data?.kode);
    setValue("provinsi_id", data?.provinsi_id);
  }, [data]);

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(mutateAsync)}>
      <Input
        label="Kode Kota/Kabupaten"
        name="kode"
        containerClass="flex-col items-start gap-1"
        spanEmptyClass="hidden"
        placeholder="Kode Kota/Kabupaten"
        register={register("kode", {
          required: "Wajib diisi",
        })}
        errors={errors.kode}
        required
        defaultValue={data?.kode}
        disabled={isLoading}
      />
      <Input
        label="Nama Kota/Kabupaten"
        name="Nama Kota/Kabupaten"
        containerClass="flex-col items-start gap-1"
        spanEmptyClass="hidden"
        placeholder="Nama Kota/Kabupaten"
        register={register("nama", {
          required: "Wajib diisi",
        })}
        errors={errors.nama}
        defaultValue={data?.nama}
        disabled={isLoading}
      />
      <div className="mt-3 flex gap-4">
        <ButtonCancel
          className={"w-full"}
          iconLeft
          onClick={() => {
            onClose();
            reset();
          }}
        />
        <ButtonSave
          className={"w-full rounded"}
          iconLeft
          disabled={isPending}
        />
      </div>
    </form>
  );
};
