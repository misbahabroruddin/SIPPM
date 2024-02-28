"use client";
import { useEffect, useId, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";

import { ButtonSave } from "@/components/button/button-save";
import { Input } from "@/components/input/input";
import { Label } from "@/components/label";
import { SingleSelect } from "@/components/select/single-select";
import { useGetProfile } from "@/handlers/biodata/query-get-profile";
import { useQueryJabatanFungsional } from "@/handlers/data-referensi/jabatan-fungsional/query-jabatan-fungsional";
import { useQuerySearchKabupaten } from "@/handlers/data-referensi/kabupaten/query-search-kabupaten";
import { useQueryProgramStudi } from "@/handlers/data-referensi/program-studi/query-program-studi";
import { useCreateOrUpdateBiodata } from "@/handlers/biodata/create-or-update-biodata";

const FormBiodata = () => {
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();
  const id = useId();

  const { data: profile, refetch } = useGetProfile(setValue);
  const [tanggalLahir, setTanggalLahir] = useState(
    profile?.tanggal_lahir ? new Date(profile?.tanggal_lahir) : "",
  );

  const { mutateAsync: onSubmit, isPending: isLoading } =
    useCreateOrUpdateBiodata();

  const {
    data: jabatanFungsionalOptions,
    isLoading: isLoadingJabatanFungsionalOptions,
  } = useQueryJabatanFungsional();

  const { data: programStudiOptions, isLoading: isLoadingProgramStudiOptions } =
    useQueryProgramStudi();

  const { data: kabupatenOptions, isLoading: isLoadingKabupatenOptions } =
    useQuerySearchKabupaten();

  const selectedTempatLahir = kabupatenOptions?.find(
    (item) => item.value === profile?.tempat_lahir_id,
  );

  const selectedJabatanFungsional = jabatanFungsionalOptions?.find(
    (item) => item.value === profile?.jabatan_fungsional_id,
  );

  const selectedProgramStudi = programStudiOptions?.find(
    (item) => item.value === profile?.program_studi_id,
  );

  useEffect(() => {
    refetch();
  }, [profile]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-2">
      <div className="flex gap-4 p-3">
        <div className="flex w-1/2 flex-col gap-2 text-sm font-[500] text-[#666666]">
          <Input
            label="Nama Lengkap"
            name="nama_lengkap"
            required
            placeholder="Nama Lengkap"
            register={register("nama_lengkap", { required: "Wajib diisi" })}
            errors={errors.nama_lengkap}
            defaultValue={profile?.nama_lengkap}
          />
          <Input
            label="NIK"
            name="nik"
            required
            placeholder="NIK"
            register={register("nik", { required: "Wajib diisi" })}
            errors={errors.nik}
            defaultValue={profile?.nik}
          />
          <Input
            label="NIDN"
            name="nidn_or_nidk_or_nim"
            required
            placeholder="NIDN"
            register={register("nidn_or_nidk_or_nim", {
              required: "Wajib diisi",
            })}
            errors={errors.nidn_or_nidk_or_nim}
            defaultValue={profile?.nidn_or_nidk_or_nim}
          />
          <SingleSelect
            label="Tempat Lahir"
            name={"tempat_lahir_id"}
            options={kabupatenOptions}
            Controller={Controller}
            control={control}
            errors={errors.tempat_lahir_id}
            rules={{ required: "Wajib diisi" }}
            id={id}
            required
            placeholder={
              selectedTempatLahir ? selectedTempatLahir?.label : "Tempat Lahir"
            }
            isLoading={isLoadingKabupatenOptions}
          />
          <div className="flex flex-col">
            <div className="flex grow">
              <Label
                htmlFor={"tanggal_lahir"}
                text="Tanggal Lahir"
                required
                className="text-start"
              />
              <Controller
                name="tanggal_lahir"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <ReactDatePicker
                    calendarIconClassname="bg-sky h-fit w-fit -top-[10px]"
                    onChange={(date) => {
                      setTanggalLahir(date);
                      onChange(date);
                    }}
                    selected={tanggalLahir}
                    startDate={tanggalLahir}
                    value={value}
                    dateFormat="dd MMM yyyy"
                    wrapperClassName={twMerge(
                      "w-full flex items-center outline outline-1 h-10 outline-secondary-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent placeholder:text-sm overflow-hidden",
                      errors.tanggal_lahir && "outline-red-500",
                    )}
                    className="ml-12 !p-0 focus:outline-none"
                    isClearable
                    placeholderText="Tanggal Lahir"
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
                rules={{ required: "Wajib diisi" }}
              />
            </div>
            {errors.tanggal_lahir && (
              <div className="flex">
                <span className="w-1/2"></span>
                <p className="w-full text-red-500">
                  * {errors.tanggal_lahir.message}
                </p>
              </div>
            )}
          </div>
          <Input
            label="Pangkat/Golongan"
            name="pangkat_golongan"
            placeholder="Pangkat/Golongan"
            register={register("pangkat_golongan")}
            errors={errors.pangkat_golongan}
            defaultValue={profile?.pangkat_golongan}
          />
          <SingleSelect
            label="Jabatan Fungsional"
            name={"jabatan_fungsional_id"}
            options={jabatanFungsionalOptions}
            Controller={Controller}
            control={control}
            errors={errors.jabatan_fungsional_id}
            rules={{ required: "Wajib diisi" }}
            id={id}
            required
            isLoading={isLoadingJabatanFungsionalOptions}
            placeholder={
              selectedJabatanFungsional
                ? selectedJabatanFungsional?.label
                : "Jabatan Fungsional"
            }
            defaultValue={profile?.jabatan_fungsional_id}
          />
        </div>
        <div className="flex w-1/2 flex-col gap-2 text-sm font-[500] text-[#666666]">
          <SingleSelect
            label="Program Studi"
            name={"program_studi_id"}
            options={programStudiOptions}
            Controller={Controller}
            control={control}
            errors={errors.program_studi_id}
            rules={{ required: "Wajib diisi" }}
            id={id}
            isLoading={isLoadingProgramStudiOptions}
            placeholder={
              selectedProgramStudi
                ? selectedProgramStudi?.label
                : "Program Studi"
            }
            defaultValue={profile?.program_studi_id}
          />
          <Input
            label="Alamat"
            name="alamat"
            placeholder="Alamat"
            register={register("alamat")}
            errors={errors.alamat}
            defaultValue={profile?.alamat}
          />
          <Input
            label="Email"
            name="email"
            placeholder="Email"
            register={register("email", { required: "Wajib diisi" })}
            errors={errors.email}
            type={"email"}
            required
            defaultValue={profile?.email}
          />
          <Input
            label="Nomor hp"
            name="nomor_hp"
            required
            placeholder="Nomor hp"
            register={register("nomor_hp", { required: "Wajib diisi" })}
            errors={errors.nomor_hp}
            defaultValue={profile?.nomor_hp}
          />
          <Input
            label="Sinta ID"
            name="sinta_id"
            placeholder="Sinta ID"
            register={register("sinta_id")}
            errors={errors.sinta_id}
            defaultValue={profile?.sinta_id}
          />
          <Input
            label="Scopus ID"
            name="scopus_id"
            placeholder="Scopus ID"
            register={register("scopus_id")}
            errors={errors.scopus_id}
            defaultValue={profile?.scopus_id}
          />
          <Input
            label="Google Scholar ID"
            name="google_scholar_id"
            placeholder="Google Scholar ID"
            register={register("google_scholar_id")}
            errors={errors.google_scholar_id}
            defaultValue={profile?.google_scholar_id}
          />
        </div>
      </div>
      <div className="my-10 px-8">
        <ButtonSave iconLeft className="ml-auto" disabled={isLoading} />
      </div>
    </form>
  );
};

export default FormBiodata;
