"use client";

import { useForm, Controller } from "react-hook-form";
import { useId } from "react";

import { ButtonCancel } from "@/components/button/button-cancel";
import { ButtonSave } from "@/components/button/button-save";
import { Input } from "@/components/input/input";
import { useCreateKomponenPenilaian } from "@/handlers/data-referensi/komponen-penilaian/administrator/add-komponen-penilaian";
import { useQueryKriteriaPenilaian } from "@/handlers/data-referensi/kriteria-penilaian/query-kriteria-penelitian";
import { SingleSelect } from "@/components/select/single-select";

export const FormTambahKomponenPenilaian = ({ setOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();

  const id = useId();

  const onClose = () => {
    setOpen(false);
  };

  const { mutateAsync, isPending } = useCreateKomponenPenilaian(onClose, reset);

  const {
    data: dataOptionKriteriaPenilaian,
    isPending: isLoadingKriteriaPenilaian,
  } = useQueryKriteriaPenilaian();

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(mutateAsync)}>
      <SingleSelect
        label={"Kriteria Penilaian"}
        Controller={Controller}
        control={control}
        options={dataOptionKriteriaPenilaian}
        placeholder={"Kriteria Penilaian"}
        name="kriteria_penilaian_id"
        errors={errors.kriteria_penilaian_id}
        rules={{ required: "Wajib diisi" }}
        id={id}
        isLoading={isLoadingKriteriaPenilaian}
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
