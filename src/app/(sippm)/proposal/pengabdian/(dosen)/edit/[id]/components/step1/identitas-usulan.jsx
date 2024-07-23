"use client";

import { useEffect, useId } from "react";
import { useForm, Controller } from "react-hook-form";

import { ButtonNext } from "@/components/button/button-next";
import { Input } from "@/components/input/input";
import { ContainerContent } from "@/components/container-content";
import { useQueryRumpunIlmu } from "@/handlers/data-referensi/rumpun-ilmu/query-rumpun-ilmu";
import { useQueryIdentitasUsulanOnUpdate } from "@/handlers/dosen/pengabdian/identitas-usulan/query-identitas-usulan-pkm-onupdate";
import { useEditIdentitasUsulanPKM } from "@/handlers/dosen/pengabdian/identitas-usulan/update-identitas-usulan";
import { SingleSelect } from "@/components/select/single-select";
import { styles } from "@/lib/utils/style-react-select";
import { TextArea } from "@/components/input/text-area";

export const IdentitasUsulanPKM = () => {
  const id = useId();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const { data: rumpunIlmuOptions, isLoading: isLoadingRumpunIlmu } =
    useQueryRumpunIlmu();

  const {
    data: identitasUsulan,
    isLoading: isLoadingIdentitasUsulan,
    refetch,
  } = useQueryIdentitasUsulanOnUpdate(setValue);

  const { onEditIdentitasUsulan, isLoadingEdit } =
    useEditIdentitasUsulanPKM(reset);

  useEffect(() => {
    refetch();
  }, []);

  const selectedRumpunIlmu = rumpunIlmuOptions?.find(
    (c) => c.value === identitasUsulan?.rumpun_ilmu_id,
  );

  return (
    <ContainerContent className="relative">
      <h1 className="text-base font-semibold text-primary lg:text-lg">
        Identitas Usulan
      </h1>
      <form onSubmit={handleSubmit(onEditIdentitasUsulan)}>
        <div className="flex flex-col gap-2 lg:flex-row lg:gap-4">
          <div className="flex grow flex-col gap-2 lg:gap-4">
            <Input
              label="Judul PKM"
              name="judul"
              placeholder="Judul PKM"
              defaultValue={identitasUsulan?.judul}
              labelClass={"text-sm font-[500] text-primary w-full lg:w-1/2"}
              spanEmptyClass={"hidden lg:block lg:w-1/2"}
              register={register("judul", {
                required: "Wajib diisi",
              })}
              errors={errors.judul}
              required
              disabled={isLoadingIdentitasUsulan}
            />
            <SingleSelect
              label={"Rumpun ilmu"}
              Controller={Controller}
              control={control}
              options={rumpunIlmuOptions}
              placeholder={
                selectedRumpunIlmu ? selectedRumpunIlmu?.label : "Rumpun Ilmu"
              }
              name="rumpun_ilmu_id"
              errors={errors.rumpun_ilmu_id}
              rules={{ required: "Wajib diisi" }}
              id={id}
              isLoading={isLoadingRumpunIlmu}
              styles={styles(selectedRumpunIlmu)}
              maxMenuHeight={150}
            />
            <Input
              label="Tahun Usulan"
              type="number"
              name="tahun_usulan"
              placeholder="Tahun Usulan"
              labelClass={"text-sm font-[500] text-primary w-full lg:w-1/2"}
              spanEmptyClass={"hidden lg:block lg:w-1/2"}
              defaultValue={identitasUsulan?.tahun_usulan}
              register={register("tahun_usulan", {
                required: "Wajib diisi",
                max: {
                  value: new Date().getFullYear(),
                  message: "Tahun Usulan tidak boleh melebihi tahun sekarang",
                },
              })}
              errors={errors.tahun_usulan}
              required
              disabled={isLoadingIdentitasUsulan}
            />
          </div>
          <div className="flex grow flex-col gap-4">
            <Input
              label="Jangka Waktu PKM  (Bulan)"
              name="jangka_waktu"
              placeholder="Jangka Waktu PKM"
              labelClass={"text-sm font-[500] text-primary w-full lg:w-1/2"}
              spanEmptyClass={"hidden lg:block lg:w-1/2"}
              defaultValue={identitasUsulan?.jangka_waktu}
              register={register("jangka_waktu", {
                required: "Wajib diisi",
              })}
              errors={errors.jangka_waktu}
              required
              type="number"
            />
            <TextArea
              label="Ringkasan PKM"
              name="ringkasan"
              labelClass={"text-sm font-[500] text-primary w-full lg:w-1/2"}
              register={register("ringkasan", {
                required: "Wajib diisi",
              })}
              errors={errors.ringkasan}
              required
              spanEmptyClass={"hidden lg:block lg:w-1/2"}
              placeholder="Ringkasan PKM"
            />
          </div>
        </div>
        <div className="absolute -bottom-16 left-0 flex w-full justify-end">
          <ButtonNext
            disabled={isLoadingEdit}
            className="w-full p-1 lg:w-[200px] lg:p-2"
          />
        </div>
      </form>
    </ContainerContent>
  );
};
