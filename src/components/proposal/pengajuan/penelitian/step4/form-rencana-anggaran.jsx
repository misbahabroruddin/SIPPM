"use client";

import { useForm } from "react-hook-form";

import { Input } from "@/components/input/input";
import { useQueryDetailRencanaAnggaranPenelitian } from "@/handlers/dosen/penelitian/rencana-anggaran/query-detail-rencana-anggaran";
import { useAddEditRencanaAnggaranPenelitian } from "@/handlers/dosen/penelitian/rencana-anggaran/add-edit-rencana-anggaran";
import { Save } from "@/components/svgs/save";
import { Close } from "@/components/svgs/close";

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
    <tr>
      <td className="hidden px-2 lg:table-cell lg:w-8 "></td>
      <td className="px-2">
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
          spanEmptyClass="hidden"
          defaultValue={data?.rincian}
        />
      </td>
      <td className="px-2">
        <Input
          containerClass="flex-col items-start gap-2 lg:flex-col lg:items-start lg:gap-2"
          labelClass="hidden"
          type="number"
          label="Biaya"
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
        <button title="Save">
          <Save
            width={26}
            height={26}
            onClick={handleSubmit(onSubmitRencanaAnggaran)}
          />
        </button>
        <button onClick={onClose} title="Cancel">
          <Close />
        </button>
      </td>
    </tr>
  );
};
