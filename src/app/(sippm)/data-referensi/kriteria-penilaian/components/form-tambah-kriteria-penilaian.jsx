"use client";

import { useForm } from "react-hook-form";

import { ButtonCancel } from "@/components/button/button-cancel";
import { ButtonSave } from "@/components/button/button-save";
import { Input } from "@/components/input/input";
import { useCreateKriteriaPenilaian } from "@/handlers/data-referensi/kriteria-penilaian/administrator/add-kriteria-penilaian";

export const FormTambahKriteriaPenilaian = ({ setOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onClose = () => {
    setOpen(false);
  };

  const { mutateAsync, isPending } = useCreateKriteriaPenilaian(onClose, reset);

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(mutateAsync)}>
      <Input
        label="Nama"
        name="nama"
        containerClass="flex-col items-start gap-1"
        spanEmptyClass="hidden lg:block"
        placeholder="Nama Kriteria Penilaian"
        register={register("nama", {
          required: "Wajib diisi",
        })}
        errors={errors.nama}
        required
      />
      <Input
        label="Bobot"
        name="bobot"
        containerClass="flex-col items-start gap-1"
        spanEmptyClass="hidden lg:block"
        placeholder="Bobot Kriteria Penilaian"
        register={register("bobot", {
          required: "Wajib diisi",
          min: {
            value: 1,
            message: "Bobot minimal satu",
          },
          max: {
            value: 100,
            message: "Bobot maksimal seratus",
          },
          valueAsNumber: true,
        })}
        type="number"
        errors={errors.bobot}
        min={1}
        max={100}
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
