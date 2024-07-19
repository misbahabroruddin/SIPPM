"use client";

import { useForm, Controller } from "react-hook-form";
import { Spinner } from "@material-tailwind/react";

import { Input } from "@/components/input/input";
import { SaveIcon } from "@/components/svgs/save";
import { CloseIcon } from "@/components/svgs/close";
import { useAddEditRencanaAnggaran } from "@/handlers/dosen/proposal/rencana-anggaran/add-edit-rencana-anggaran";
import { useQueryDetailRencanaAnggaran } from "@/handlers/dosen/proposal/rencana-anggaran/query-detail-rencana-anggaran";
import { useQueryRincianBiayaOptions } from "@/handlers/data-referensi/rincian-biaya/query-get-option-rincian-biaya";
import { SingleSelect } from "@/components/select/single-select";
import { styles } from "@/lib/utils/style-react-select";
import { useEffect } from "react";
import { convertToRupiah } from "@/lib/utils/convertToRupiah";

export const FormRencanaAnggaranPenelitian = ({ onClose, id }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    control,
    watch,
  } = useForm();

  const rincianBiayaId = watch("rincian_biaya_id");

  const { data: rincianBiayaOptions, isLoading: isLoadingRincianBiaya } =
    useQueryRincianBiayaOptions();

  const { data, refetch } = useQueryDetailRencanaAnggaran(setValue, id);

  const {
    mutateAsync: onSubmitRencanaAnggaran,
    isPending: isLoadingRencanaAnggaran,
  } = useAddEditRencanaAnggaran(id, reset, onClose);

  const selectedRincianBiaya = rincianBiayaOptions?.find(
    (c) => c.value === data?.rincian_biaya_id,
  );

  const selectedRincianBiayaWhenAdd = rincianBiayaOptions?.find(
    (c) => c.value === rincianBiayaId,
  );

  useEffect(() => {
    if (rincianBiayaId) {
      setValue("rincian_biaya_id", selectedRincianBiayaWhenAdd?.value);
      setValue("biaya", selectedRincianBiayaWhenAdd?.anggaran);
    }
    console.log(id, "<<<<<");
  }, [rincianBiayaId]);

  useEffect(() => {
    if (id) refetch();
  }, [id]);

  return (
    <tr className="border-1 border border-black-09">
      <td className="hidden px-2 lg:table-cell lg:w-8 "></td>
      <td className="px-2">
        {/* <div className="w-full rounded-lg border border-gray1 p-2">
          <select
            name="rincian_biaya_id"
            id="rincian_biaya_id"
            className="w-full border-none bg-transparent"
            defaultValue=""
          >
            <option value="" disabled>
              Pilih rincian biaya
            </option>
            {rincianBiayaOptions?.map((item) => (
              <option value={item.value}>{item.label}</option>
            ))}
          </select>
        </div> */}
        <SingleSelect
          Controller={Controller}
          control={control}
          options={rincianBiayaOptions}
          placeholder={data?.rincian_biaya?.rincian || "Rincian Biaya"}
          name="rincian_biaya_id"
          errors={errors.rincian_biaya_id}
          rules={{
            required: "harus diisi",
          }}
          id={id}
          isLoading={isLoadingRincianBiaya}
          maxMenuHeight={180}
          spanEmptyClass="hidden"
          styles={styles(selectedRincianBiaya)}
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
            max: {
              value: selectedRincianBiayaWhenAdd?.anggaran,
              message: `Biaya maksimal ${convertToRupiah(selectedRincianBiayaWhenAdd?.anggaran)}`,
            },
          })}
          errors={errors.biaya}
          required
          spanEmptyClass="hidden"
          defaultValue={data?.biaya || selectedRincianBiayaWhenAdd?.biaya}
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
