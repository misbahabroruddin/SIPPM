"use client";
import { useForm } from "react-hook-form";

import { ButtonCancel } from "@/components/button/button-cancel";
import { ButtonSave } from "@/components/button/button-save";
import { Input } from "@/components/input/input";
import { useQueryEditJabatanFungsional } from "@/handlers/data-referensi/jabatan-fungsional/administrator/edit-jabatan-fungsional";
import { useQueryGetDetailJabatanFungsional } from "@/handlers/data-referensi/jabatan-fungsional/administrator/get-detail-jabatan-fungsional";

export const FormEditJabatanFungsional = ({ id, setOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onClose = () => {
    setOpen(false);
  };

  const { mutateAsync } = useQueryEditJabatanFungsional(id);
  const { data } = useQueryGetDetailJabatanFungsional(id);

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(mutateAsync)}>
      <Input
        label="Nama"
        name="nama"
        containerClass="flex-col items-start gap-1"
        spanEmptyClass="hidden"
        placeholder="Nama Jabatan Fungsional"
        register={register("nama", {
          required: "Wajib diisi",
        })}
        errors={errors.nama}
        required
        defaultValue={data?.nama}
      />
      <Input
        label="Keterangan"
        name="keterangan"
        containerClass="flex-col items-start gap-1"
        spanEmptyClass="hidden"
        placeholder="Keterangan Jabatan Fungsional"
        register={register("keterangan")}
        errors={errors.keterangan}
        defaultValue={data?.keterangan}
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
        <ButtonSave className={"w-full rounded"} iconLeft />
      </div>
    </form>
  );
};
