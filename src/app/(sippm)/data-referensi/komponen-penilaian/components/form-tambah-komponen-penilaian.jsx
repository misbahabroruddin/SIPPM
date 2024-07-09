"use client";

import { useForm } from "react-hook-form";

import { ButtonCancel } from "@/components/button/button-cancel";
import { ButtonSave } from "@/components/button/button-save";
import { Input } from "@/components/input/input";
import { useCreateKomponenPenilaian } from "@/handlers/data-referensi/komponen-penilaian/administrator/add-komponen-penilaian";

export const FormTambahKomponenPenilaian = ({ setOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onClose = () => {
    setOpen(false);
  };

  const { mutateAsync, isPending } = useCreateKomponenPenilaian(onClose, reset);

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(mutateAsync)}>
      <Input
        label="Kriteria Penilaian"
        name="kriteria_penilaian_id"
        containerClass="flex-col items-start gap-1"
        spanEmptyClass="hidden lg:block"
        placeholder="Kriteria Penilaian"
        register={register("kriteria_penilaian_id", {
          required: "Wajib diisi",
        })}
        errors={errors.kriteria_penilaian_id}
        required
      />
      <Input
        label="Nama"
        name="nama"
        containerClass="flex-col items-start gap-1"
        spanEmptyClass="hidden lg:block"
        placeholder="Nama Komponen Penilaian"
        register={register("nama", {
          required: "Wajib diisi",
        })}
        errors={errors.nama}
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
