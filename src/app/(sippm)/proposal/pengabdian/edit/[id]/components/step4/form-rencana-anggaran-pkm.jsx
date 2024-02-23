"use client";

import { useForm } from "react-hook-form";

import { Input } from "@/components/input/input";
import { ButtonCancel } from "@/components/button/button-cancel";
import { ButtonSave } from "@/components/button/button-save";
import { useQueryDetailRencanaAnggaranPKM } from "@/handlers/pengabdian/rencana-anggaran/query-detail-rencana-anggaran-pkm";
import { useAddEditRencanaAnggaranPKM } from "@/handlers/pengabdian/rencana-anggaran/add-edit-rencana-anggaran-pkm";

export const FormRencanaAnggaranPKM = ({ onClose, id }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const { data } = useQueryDetailRencanaAnggaranPKM(setValue, id);

  const { addEditRencanaAnggaran, isPending } = useAddEditRencanaAnggaranPKM(
    id,
    reset,
    onClose
  );

  return (
    <form
      className='flex flex-col gap-3 px-3'
      onSubmit={handleSubmit(addEditRencanaAnggaran)}
    >
      <Input
        containerClass='flex-col items-start gap-2'
        labelClass='text-start'
        label='Rincian'
        name={"rincian"}
        placeholder='Rincian'
        register={register("rincian", {
          required: "harus diisi",
        })}
        errors={errors.rincian}
        required
        defaultValue={data?.rincian}
      />
      <Input
        containerClass='flex-col items-start gap-2'
        labelClass='text-start'
        type='number'
        label='Biaya'
        name='biaya'
        placeholder='Biaya'
        register={register("biaya", {
          required: "harus diisi",
        })}
        errors={errors.biaya}
        required
        defaultValue={data?.biaya}
      />
      <div className='flex justify-center gap-4 my-2'>
        <ButtonCancel className='w-36 lg:w-40' iconLeft onClick={onClose} />
        <ButtonSave className='w-36 lg:w-40' iconLeft disabled={isPending} />
      </div>
    </form>
  );
};
