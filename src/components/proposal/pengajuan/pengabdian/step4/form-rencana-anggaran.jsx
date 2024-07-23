"use client";

import { convertToRupiah } from "@/lib/utils/convertToRupiah";
import { useForm, Controller } from "react-hook-form";

import { Input } from "@/components/input/input";
import { SaveIcon } from "@/components/svgs/save";
import { CloseIcon } from "@/components/svgs/close";
import { Spinner } from "@material-tailwind/react";
import { SingleSelect } from "@/components/select/single-select";
import { useAddEditRencanaAnggaran } from "@/handlers/dosen/proposal/rencana-anggaran/add-edit-rencana-anggaran";
import { useQueryDetailRencanaAnggaran } from "@/handlers/dosen/proposal/rencana-anggaran/query-detail-rencana-anggaran";
import { useQueryRincianBiayaOptions } from "@/handlers/data-referensi/rincian-biaya/query-get-option-rincian-biaya";
import { useEffect } from "react";
import { styles } from "@/lib/utils/style-react-select";
import { CurrencyInput } from "@/components/input/input-currency";

export const FormRencanaAnggaranPKM = ({ onClose, id }) => {
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
  const biaya = watch("biaya");

  const { data: rincianBiayaOptions, isLoading: isLoadingRincianBiaya } =
    useQueryRincianBiayaOptions();

  const { data, isLoading, refetch } = useQueryDetailRencanaAnggaran(
    setValue,
    id,
  );

  const { mutateAsync: addEditRencanaAnggaran, isPending } =
    useAddEditRencanaAnggaran(id, reset, onClose);

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
  }, [rincianBiayaId]);

  useEffect(() => {
    if (id) refetch();
  }, [id]);

  return (
    <tr className="border-1 border border-black-09 ">
      <td className="hidden px-2 lg:table-cell lg:w-8"></td>
      <td className="px-2 py-1">
        <SingleSelect
          Controller={Controller}
          control={control}
          options={rincianBiayaOptions}
          placeholder={"Rincian Biaya"}
          name="rincian_biaya_id"
          errors={errors.rincian_biaya_id}
          rules={{ required: "harus diisi" }}
          id={id}
          isLoading={isLoadingRincianBiaya}
          maxMenuHeight={180}
          spanEmptyClass="hidden"
          styles={styles(selectedRincianBiaya)}
        />
      </td>
      <td className="px-2">
        <CurrencyInput
          name={"biaya"}
          control={control}
          Controller={Controller}
          rules={{
            required: "harus diisi",
            max: {
              value: selectedRincianBiayaWhenAdd?.anggaran,
              message: `Biaya maksimal ${convertToRupiah(selectedRincianBiayaWhenAdd?.anggaran)}`,
            },
          }}
          placeholder="Biaya"
          errors={errors.biaya}
          spanEmptyClass="hidden"
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
