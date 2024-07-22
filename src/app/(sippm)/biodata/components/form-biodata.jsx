"use client";
import { useEffect, useId, useState } from "react";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { id } from "date-fns/locale";
registerLocale("id", id);

import { ButtonSave } from "@/components/button/button-save";
import { Input } from "@/components/input/input";
import { Label } from "@/components/label";
import { SingleSelect } from "@/components/select/single-select";
import { useGetProfile } from "@/handlers/biodata/query-get-profile";
import { useQueryJabatanFungsional } from "@/handlers/data-referensi/jabatan-fungsional/query-jabatan-fungsional";
import { useQuerySearchKabupaten } from "@/handlers/data-referensi/kabupaten/query-search-kabupaten";
import { useQueryProgramStudi } from "@/handlers/data-referensi/program-studi/query-program-studi";
import { useCreateOrUpdateBiodata } from "@/handlers/biodata/create-or-update-biodata";
import { styles } from "@/lib/utils/style-react-select";
import { DateIcon } from "@/components/svgs/date";

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
  const [tanggalLahir, setTanggalLahir] = useState(null);

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
    if (profile?.tanggal_lahir) {
      setValue("tanggal_lahir", new Date(profile?.tanggal_lahir));
      setTanggalLahir(new Date(profile?.tanggal_lahir));
    }
    refetch();
  }, [profile]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-2">
      <div className="flex flex-col gap-2 p-3 lg:flex-row lg:gap-4">
        <div className="flex w-full flex-col gap-2 text-sm font-[500] text-primary lg:w-1/2">
          <Input
            label="Nama Lengkap"
            name="nama_lengkap"
            required
            placeholder="Nama Lengkap"
            register={register("nama_lengkap", { required: "Wajib diisi" })}
            errors={errors.nama_lengkap}
            defaultValue={profile?.nama_lengkap}
            spanEmptyClass="hidden"
          />
          <Input
            label="NIK"
            name="nik"
            required
            placeholder="Nomor Induk Kependudukan"
            register={register("nik", { required: "Wajib diisi" })}
            errors={errors.nik}
            defaultValue={profile?.nik}
            type="number"
            spanEmptyClass="hidden"
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
            type="number"
            spanEmptyClass="hidden"
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
            styles={styles(selectedTempatLahir)}
          />
          <div className="flex flex-col">
            <div className="flex grow flex-col gap-1 lg:flex-row lg:gap-0">
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
                    dateFormat="dd MMMM yyyy"
                    wrapperClassName={twMerge(
                      "w-full flex items-center outline outline-1 h-10 outline-secondary-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent placeholder:text-sm overflow-hidden",
                      errors.tanggal_lahir && "outline-red-500",
                    )}
                    className="ml-12 !p-0 focus:outline-none"
                    placeholderText="Tanggal Lahir"
                    showIcon
                    icon={<DateIcon />}
                    showMonthDropdown
                    showYearDropdown
                    scrollableYearDropdown
                    dropdownMode="select"
                    locale={"id"}
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
            spanEmptyClass="hidden"
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
            styles={styles(selectedJabatanFungsional)}
          />
        </div>
        <div className="flex w-full flex-col gap-2 text-sm font-[500] text-[#666666] lg:w-1/2">
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
            styles={styles(selectedProgramStudi)}
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
            spanEmptyClass="hidden"
          />
          <Input
            label="Nomor hp"
            name="nomor_hp"
            required
            placeholder="Nomor hp"
            register={register("nomor_hp", { required: "Wajib diisi" })}
            errors={errors.nomor_hp}
            defaultValue={profile?.nomor_hp}
            type="number"
            spanEmptyClass="hidden"
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
        <ButtonSave
          iconLeft
          className="ml-auto"
          disabled={isLoading}
          isLoading={isLoading}
        />
      </div>
    </form>
  );
};

export default FormBiodata;
