"use client";

import { useForm } from "react-hook-form";
import { Spinner } from "@material-tailwind/react";

import { Input } from "@/components/input/input";
import { useQueryDetailRencanaAnggaranPenelitian } from "@/handlers/dosen/penelitian/rencana-anggaran/query-detail-rencana-anggaran";
import { useAddEditRencanaAnggaranPenelitian } from "@/handlers/dosen/penelitian/rencana-anggaran/add-edit-rencana-anggaran";
import { SaveIcon } from "@/components/svgs/save";
import { CloseIcon } from "@/components/svgs/close";

export const FormRencanaAnggaranPenelitian = ({ onClose, id }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const { data } = useQueryDetailRencanaAnggaranPenelitian(setValue, id);

  const { onSubmitRencanaAnggaran, isLoadingRencanaAnggaran } =
    useAddEditRencanaAnggaranPenelitian(id, reset, onClose);

  return (
    <tr className="border-1 border border-black-09">
      <td className="hidden px-2 lg:table-cell lg:w-8 "></td>
      <td className="px-2">
        <Input
          containerClass="flex-col items-start gap-2 lg:flex-col lg:items-start lg:gap-2"
          name={"rincian"}
          placeholder="Rincian"
          register={register("rincian", {
            required: "harus diisi",
          })}
          errors={errors.rincian}
          required
          spanEmptyClass="hidden"
          defaultValue={data?.rincian}
        />
      </td>
      <td className="px-2">
        <Input
          containerClass="flex-col items-start gap-2 lg:flex-col lg:items-start lg:gap-2"
          type="number"
          name="biaya"
          placeholder="Biaya"
          register={register("biaya", {
            required: "harus diisi",
          })}
          errors={errors.biaya}
          required
          spanEmptyClass="hidden"
          defaultValue={data?.biaya}
        />
      </td>
      <td className="mx-auto w-7 py-2 text-center lg:py-3">
        <button title="Save" disabled={isLoadingRencanaAnggaran}>
          {isLoadingRencanaAnggaran ? (
            <div className="p-1">
              <Spinner className="h-4 w-4" />
            </div>
          ) : (
            <SaveIcon
              width={26}
              height={26}
              onClick={handleSubmit(onSubmitRencanaAnggaran)}
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
