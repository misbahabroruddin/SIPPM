"use client";

import { Controller, useForm } from "react-hook-form";
import ReactDatePicker from "react-datepicker";
import { useEffect, useState } from "react";

import { Input } from "@/components/input/input";
import { SaveIcon } from "@/components/svgs/save";
import { CloseIcon } from "@/components/svgs/close";
import { DateIcon } from "@/components/svgs/date";
import { Spinner } from "@material-tailwind/react";
import { useAddEditRincianKegiatan } from "@/handlers/dosen/proposal/rincian-kegiatan/add-edit-rincian-kegiatan";
import { useQueryDetailRincianKegiatan } from "@/handlers/dosen/proposal/rincian-kegiatan/query-detail-rincian-kegiatan";

export const FormRincianKegiatan = ({ onClose, id }) => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    setError,
    clearErrors,
    control,
    formState: { errors },
  } = useForm();

  const { data: detailRincianKegiatan } = useQueryDetailRincianKegiatan(
    id,
    setStartDate,
    setEndDate,
    setValue,
  );

  const { mutateAsync: onSubmitRincianKegiatan, isPending: isLoadingSubmit } =
    useAddEditRincianKegiatan(id, setStartDate, setEndDate, reset, onClose);

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    if (isDisabled) {
      setError("waktu", {
        type: "required",
        message: "Rentang waktu harus diisi",
      });
    } else {
      clearErrors("waktu");
    }
  }, [isDisabled]);

  // set date range when get detail data
  // useEffect(() => {
  //   const dateRangeArr = [];
  //   const dateStart = convertToTimestamp(detailRincianKegiatan?.tanggal_awal);
  //   const dateEnd = convertToTimestamp(detailRincianKegiatan?.tanggal_akhir);
  //   dateRangeArr.push(dateStart, dateEnd);

  //   setValue("waktu", dateRangeArr);

  //   console.log(detailRincianKegiatan?.tanggal_awal);

  //   if (dateRangeArr) {
  //     setStartDate(dateStart);
  //     setEndDate(dateEnd);
  //   }
  // }, [detailRincianKegiatan]);

  return (
    <tr className="border-1 border border-black-09">
      <td className="hidden px-2 lg:table-cell lg:w-8 "></td>
      <td className="px-2">
        <Input
          containerClass="flex-col items-start gap-2 lg:flex-col lg:items-start lg:gap-2"
          name={"kegiatan"}
          placeholder="Kegiatan"
          register={register("kegiatan", {
            required: "harus diisi",
          })}
          errors={errors.kegiatan}
          required
          defaultValue={detailRincianKegiatan?.kegiatan}
          spanEmptyClass="hidden"
        />
      </td>
      <td>
        <div>
          <Controller
            name="waktu"
            control={control}
            rules={{ required: "Rentang waktu harus diisi" }}
            render={({ field: { onChange } }) => (
              <ReactDatePicker
                calendarIconClassname="bg-sky h-fit w-fit -top-2"
                onChange={(dates) => {
                  const [start, end] = dates;

                  if (!end) {
                    setIsDisabled(true);
                  } else {
                    setIsDisabled(false);
                  }

                  setStartDate(start);
                  setEndDate(end);
                  onChange(dates);
                }}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                dateFormat="dd MMMM yyyy"
                wrapperClassName="w-full flex items-center outline outline-1 h-10 outline-secondary-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent placeholder:text-sm overflow-hidden"
                className="ml-12 !p-0 focus:outline-none"
                isClearable
                placeholderText="Rentang Waktu Kegiatan"
                showIcon
                icon={<DateIcon />}
                monthsShown={2}
              />
            )}
          />
          {errors.waktu && (
            <p className="text-sm text-red-500">* {errors.waktu.message}</p>
          )}
        </div>
      </td>
      <td className="mx-auto w-7 py-2 text-center lg:py-3">
        <button title="Save" disabled={isLoadingSubmit}>
          {isLoadingSubmit ? (
            <div className="p-1">
              <Spinner className="h-4 w-4" />
            </div>
          ) : (
            <SaveIcon
              width={26}
              height={26}
              onClick={handleSubmit(onSubmitRincianKegiatan)}
            />
          )}
        </button>
        <button onClick={handleClose} title="Cancel">
          <CloseIcon />
        </button>
      </td>
    </tr>
  );
};
