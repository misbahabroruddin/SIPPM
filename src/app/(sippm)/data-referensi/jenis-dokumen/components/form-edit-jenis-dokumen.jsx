"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { ButtonCancel } from "@/components/button/button-cancel";
import { ButtonSave } from "@/components/button/button-save";
import { Input } from "@/components/input/input";
import { useQueryEditJenisDokumen } from "@/handlers/data-referensi/jenis-dokumen/administrator/edit-jenis-dokumen";

export const FormEditJenisDokumen = ({ id, setOpen, data, isLoading }) => {
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

  const { mutateAsync, isPending } = useQueryEditJenisDokumen(id);

  useEffect(() => {
    setValue("nama", data?.nama);
    setValue("mimes", data?.mimes);
    setValue("size", data?.size);
  }, [data]);

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(mutateAsync)}>
      <Input
        label="Nama"
        name="nama"
        containerClass="flex-col items-start gap-1"
        spanEmptyClass="hidden lg:block"
        placeholder="Nama"
        register={register("nama", {
          required: "Wajib diisi",
        })}
        errors={errors.nama}
        defaultValue={data?.nama}
        disabled={isLoading}
        required
      />
      <Input
        label="Size"
        name="size"
        containerClass="flex-col items-start gap-1"
        spanEmptyClass="hidden lg:block"
        placeholder="Size"
        register={register("size", {
          required: "Wajib diisi",
        })}
        errors={errors.size}
        defaultValue={data?.size}
        disabled={isLoading}
        required
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
          isLoading={isPending}
        />
      </div>
    </form>
  );
};
