"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { ButtonCancel } from "@/components/button/button-cancel";
import { ButtonSave } from "@/components/button/button-save";
import { Input } from "@/components/input/input";
import { useQueryEditLuaranWajib } from "@/handlers/data-referensi/luaran-wajib/administrator/edit-luaran-wajib";

export const FormEditLuaranWajib = ({ id, setOpen, data, isLoading }) => {
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

  const { mutateAsync, isPending } = useQueryEditLuaranWajib(id);

  useEffect(() => {
    setValue("nama", data?.nama);
    setValue("keterangan", data?.keterangan);
  }, [data]);

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(mutateAsync)}>
      <Input
        label="Nama"
        name="nama"
        containerClass="flex-col items-start gap-1"
        spanEmptyClass="hidden"
        placeholder="Nama Luaran Wajib"
        register={register("nama", {
          required: "Wajib diisi",
        })}
        errors={errors.nama}
        required
        defaultValue={data?.nama}
        disabled={isLoading}
      />
      <Input
        label="Keterangan"
        name="keterangan"
        containerClass="flex-col items-start gap-1"
        spanEmptyClass="hidden"
        placeholder="Keterangan Luaran Wajib"
        register={register("keterangan")}
        errors={errors.keterangan}
        defaultValue={data?.keterangan}
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
          isLoading={isPending}
        />
      </div>
    </form>
  );
};
