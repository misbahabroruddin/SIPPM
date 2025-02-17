"use client";
import { useForm } from "react-hook-form";

import { ButtonCancel } from "@/components/button/button-cancel";
import { ButtonSave } from "@/components/button/button-save";
import { Input } from "@/components/input/input";
import { useCreateListingKabupaten } from "@/handlers/data-referensi/kabupaten/administator/add-kabupaten";

export const FormTambahKabupaten = ({ setOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onClose = () => {
    setOpen(false);
  };

  const { mutateAsync, isPending } = useCreateListingKabupaten(onClose, reset);

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
