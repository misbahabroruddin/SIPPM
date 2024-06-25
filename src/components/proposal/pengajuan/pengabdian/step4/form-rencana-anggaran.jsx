"use client";

import { useForm } from "react-hook-form";

import { Input } from "@/components/input/input";
import { ButtonCancel } from "@/components/button/button-cancel";
import { ButtonSave } from "@/components/button/button-save";
import { useQueryDetailRencanaAnggaranPKM } from "@/handlers/dosen/pengabdian/rencana-anggaran/query-detail-rencana-anggaran-pkm";
import { useAddEditRencanaAnggaranPKM } from "@/handlers/dosen/pengabdian/rencana-anggaran/add-edit-rencana-anggaran-pkm";
import { SaveIcon } from "@/components/svgs/save";
import { CloseIcon } from "@/components/svgs/close";
import { Spinner } from "@material-tailwind/react";

export const FormRencanaAnggaranPKM = ({ onClose, id }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const { data, isLoading } = useQueryDetailRencanaAnggaranPKM(setValue, id);

  const { addEditRencanaAnggaran, isPending } = useAddEditRencanaAnggaranPKM(
    id,
    reset,
    onClose,
  );

  return (
    <tr className="border-1 border border-black-09 ">
      <td className="hidden px-2 lg:table-cell lg:w-8"></td>
      <td className="px-2 py-1">
        <Input
          containerClass="flex-col items-start gap-2 lg:flex-col lg:items-start lg:gap-2"
          labelClass="hidden"
          name={"rincian"}
          placeholder="Rincian"
          register={register("rincian", {
            required: "harus diisi",
          })}
          errors={errors.rincian}
          required
          defaultValue={data?.rincian}
          spanEmptyClass="hidden"
          disabled={isLoading}
        />
      </td>
      <td className="px-2">
        <Input
          containerClass="flex-col items-start gap-2 lg:flex-col lg:items-start lg:gap-2"
          labelClass="hidden"
          type="number"
          name="biaya"
          placeholder="Biaya"
          register={register("biaya", {
            required: "harus diisi",
          })}
          errors={errors.biaya}
          required
          defaultValue={data?.biaya}
          spanEmptyClass="hidden"
          disabled={isLoading}
        />
      </td>
      <td className="mx-auto my-2 flex w-fit justify-center gap-2">
        <button title="Save" disabled={isPending}>
          {isPending ? (
            <Spinner className="h-4 w-4" />
          ) : (
            <SaveIcon
              width={26}
              height={26}
              onClick={handleSubmit(addEditRencanaAnggaran)}
            />
          )}
        </button>
        <button onClick={onClose} title="Cancel">
          <CloseIcon />
        </button>
      </td>
    </tr>
  );
};
