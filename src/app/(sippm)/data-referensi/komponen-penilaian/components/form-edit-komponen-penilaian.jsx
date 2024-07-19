"use client";

import { useEffect, useId } from "react";
import { useForm, Controller } from "react-hook-form";

import { ButtonCancel } from "@/components/button/button-cancel";
import { ButtonSave } from "@/components/button/button-save";
import { Input } from "@/components/input/input";
import { useQueryEditKomponenPenilaian } from "@/handlers/data-referensi/komponen-penilaian/administrator/edit-komponen-penilaian";
import { useQueryKriteriaPenilaian } from "@/handlers/data-referensi/kriteria-penilaian/query-kriteria-penelitian";
import { SingleSelect } from "@/components/select/single-select";
import { styles } from "@/lib/utils/style-react-select";

export const FormEditKomponenPenilaian = ({ id, setOpen, data, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    control,
  } = useForm();

  const {
    data: kriteriaPenilaianOptions,
    isLoading: isLoadingKriteriaPenilaian,
  } = useQueryKriteriaPenilaian();

  const onClose = () => {
    setOpen(false);
  };

  const idSelect = useId();

  const { mutateAsync, isPending } = useQueryEditKomponenPenilaian(id);

  const selectedKriteriaPenilaian = kriteriaPenilaianOptions?.find(
    (c) => c.value === data?.kriteria_penilaian_id,
  );

  useEffect(() => {
    setValue("kriteria_penilaian_id", data?.kriteria_penilaian_id);
    setValue("nama", data?.nama);
  }, [data]);

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(mutateAsync)}>
      <SingleSelect
        label={"Kriteria Penilaian"}
        Controller={Controller}
        control={control}
        options={kriteriaPenilaianOptions}
        placeholder={
          selectedKriteriaPenilaian
            ? selectedKriteriaPenilaian?.label
            : "Kriteria Penilaian"
        }
        name="kriteria_penilaian_id"
        errors={errors.kriteria_penilaian_id}
        rules={{ required: "Wajib diisi" }}
        id={idSelect}
        isLoading={isLoadingKriteriaPenilaian}
        maxMenuHeight={180}
        styles={styles(selectedKriteriaPenilaian?.value)}
      />
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
