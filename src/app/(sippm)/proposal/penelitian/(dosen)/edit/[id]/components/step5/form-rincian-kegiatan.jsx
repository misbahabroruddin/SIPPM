"use client";

import { Controller, useForm } from "react-hook-form";
import ReactDatePicker from "react-datepicker";
import { useState } from "react";

import { Input } from "@/components/input/input";
import { ButtonCancel } from "@/components/button/button-cancel";
import { ButtonSave } from "@/components/button/button-save";
import { Label } from "@/components/label";
import { useQueryDetailRincianKegiatanPenelitian } from "@/handlers/dosen/penelitian/rincian-kegiatan/query-detail-rincian-kegiatan-penelitian";
import { useAddEditRincianKegiatanPenelitian } from "@/handlers/dosen/penelitian/rincian-kegiatan/add-edit-rincian-kegiatan-penelitian";

export const FormRincianKegiatan = ({ onClose, id }) => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm();
  const { detailRincianKegiatanPenelitian } =
    useQueryDetailRincianKegiatanPenelitian(
      id,
      setStartDate,
      setEndDate,
      setValue,
    );
  const { onSubmitRincianKegiatanPenelitian, isLoadingSubmit } =
    useAddEditRincianKegiatanPenelitian(
      id,
      setStartDate,
      setEndDate,
      reset,
      onClose,
    );
  return (
    <form
      className="flex flex-col gap-3 px-3"
      onSubmit={handleSubmit(onSubmitRincianKegiatanPenelitian)}
    >
      <Input
        containerClass="flex-col items-start gap-2"
        labelClass="text-start"
        label="Kegiatan"
        name={"kegiatan"}
        placeholder="Kegiatan"
        register={register("kegiatan", {
          required: "harus diisi",
        })}
        errors={errors.kegiatan}
        required
        defaultValue={detailRincianKegiatanPenelitian?.kegiatan}
      />
      <div className="flex w-full flex-col gap-2">
        <Label htmlFor={"waktu"} text="Waktu" required className="text-start" />
        <Controller
          name="waktu"
          control={control}
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
              dateFormat="dd MMM yyyy"
              wrapperClassName="w-full flex items-center outline outline-1 h-10 outline-secondary-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent placeholder:text-sm overflow-hidden"
              className="ml-12 !p-0 focus:outline-none"
              isClearable
              placeholderText="Waktu"
              showIcon
              icon={
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.625 13H8.375C8.15625 13 8 12.8438 8 12.625V11.375C8 11.1875 8.15625 11 8.375 11H9.625C9.8125 11 10 11.1875 10 11.375V12.625C10 12.8438 9.8125 13 9.625 13ZM13 12.625C13 12.8438 12.8125 13 12.625 13H11.375C11.1562 13 11 12.8438 11 12.625V11.375C11 11.1875 11.1562 11 11.375 11H12.625C12.8125 11 13 11.1875 13 11.375V12.625ZM16 12.625C16 12.8438 15.8125 13 15.625 13H14.375C14.1562 13 14 12.8438 14 12.625V11.375C14 11.1875 14.1562 11 14.375 11H15.625C15.8125 11 16 11.1875 16 11.375V12.625ZM13 15.625C13 15.8438 12.8125 16 12.625 16H11.375C11.1562 16 11 15.8438 11 15.625V14.375C11 14.1875 11.1562 14 11.375 14H12.625C12.8125 14 13 14.1875 13 14.375V15.625ZM10 15.625C10 15.8438 9.8125 16 9.625 16H8.375C8.15625 16 8 15.8438 8 15.625V14.375C8 14.1875 8.15625 14 8.375 14H9.625C9.8125 14 10 14.1875 10 14.375V15.625ZM16 15.625C16 15.8438 15.8125 16 15.625 16H14.375C14.1562 16 14 15.8438 14 15.625V14.375C14 14.1875 14.1562 14 14.375 14H15.625C15.8125 14 16 14.1875 16 14.375V15.625ZM19 7.5V18.5C19 19.3438 18.3125 20 17.5 20H6.5C5.65625 20 5 19.3438 5 18.5V7.5C5 6.6875 5.65625 6 6.5 6H8V4.375C8 4.1875 8.15625 4 8.375 4H9.625C9.8125 4 10 4.1875 10 4.375V6H14V4.375C14 4.1875 14.1562 4 14.375 4H15.625C15.8125 4 16 4.1875 16 4.375V6H17.5C18.3125 6 19 6.6875 19 7.5ZM17.5 18.3125V9H6.5V18.3125C6.5 18.4375 6.5625 18.5 6.6875 18.5H17.3125C17.4062 18.5 17.5 18.4375 17.5 18.3125Z"
                    fill="#333333"
                  />
                </svg>
              }
            />
          )}
        />
      </div>
      <div className="my-4 flex justify-center gap-4">
        <ButtonCancel className="w-36 lg:w-40" iconLeft onClick={onClose} />
        <ButtonSave
          className="w-36 lg:w-40"
          iconLeft
          disabled={isDisabled || isLoadingSubmit}
          isLoading={isLoadingSubmit}
        />
      </div>
    </form>
  );
};
