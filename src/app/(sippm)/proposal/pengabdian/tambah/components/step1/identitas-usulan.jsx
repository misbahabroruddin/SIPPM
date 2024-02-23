"use client";

import { useEffect, useId } from "react";
import { useForm, Controller } from "react-hook-form";
import ReactSelect from "react-select";

import { ButtonNext } from "@/components/button/button-next";
import { Input } from "@/components/input/input";
import { Label } from "@/components/label";
import { ContainerContent } from "@/components/container-content";
import { useStep } from "@/lib/hooks/useStep";
import { useQueryRumpunIlmu } from "@/handlers/data-referensi/rumpun-ilmu/query-rumpun-ilmu";
import { useQueryIdentitasUsulanPKM } from "@/handlers/pengabdian/identitas-usulan/query-identitas-usulan-pkm";
import { useAddIdentitasUsulanPKM } from "@/handlers/pengabdian/identitas-usulan/add-identitas-usulan";
import { SingleSelect } from "@/components/select/single-select";

export const IdentitasUsulanPKM = () => {
  const { currentStep } = useStep();
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
  } = useQueryIdentitasUsulanPKM(setValue);

  const { onSubmitIdentitasUsulan, isLoadingSubmit } =
    useAddIdentitasUsulanPKM(reset);

  useEffect(() => {
    const isEdit = JSON.parse(localStorage.getItem("isEdit"));

    if (isEdit && currentStep === 1) {
      refetch();
    }
  }, []);

  return (
    <ContainerContent className='relative'>
      <h1 className='text-primary font-semibold text-lg'>Identitas Usulan</h1>
      <form onSubmit={handleSubmit(onSubmitIdentitasUsulan)}>
        <div className='flex gap-4 '>
          <div className='flex flex-col gap-4 grow'>
            <Input
              label='Judul PKM'
              name='judul_pkm'
              placeholder='Judul PKM'
              defaultValue={identitasUsulan?.judul_pkm}
              register={register("judul_pkm", {
                required: "Wajib diisi",
              })}
              errors={errors.judul_pkm}
              required
              disabled={isLoadingIdentitasUsulan}
            />
            <SingleSelect
              label={"Rumpun ilmu"}
              Controller={Controller}
              control={control}
              options={rumpunIlmuOptions}
              placeholder={
                rumpunIlmuOptions?.find(
                  (c) => c.value === identitasUsulan?.rumpun_ilmu_id
                )?.label || "Rumpun Ilmu"
              }
              name='rumpun_ilmu_id'
              errors={errors.rumpun_ilmu_id}
              rules={{ required: "Wajib diisi" }}
              id={id}
              isLoading={isLoadingRumpunIlmu}
            />
            <Input
              label='Tahun Usulan'
              type='number'
              name='tahun_usulan'
              placeholder='Tahun Usulan'
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
          <div className='flex flex-col gap-4 grow'>
            <Input
              label='Jangka Waktu PKM'
              name='jangka_waktu_pkm'
              placeholder='Jangka Waktu PKM'
              defaultValue={identitasUsulan?.jangka_waktu_pkm}
              register={register("jangka_waktu_pkm", {
                required: "Wajib diisi",
              })}
              errors={errors.jangka_waktu_pkm}
              required
            />
            <Input
              label='Ringkasan PKM'
              name='ringkasan_pkm'
              placeholder='Ringkasan PKM'
              defaultValue={identitasUsulan?.ringkasan_pkm}
              register={register("ringkasan_pkm", {
                required: "Wajib diisi",
              })}
              errors={errors.ringkasan_pkm}
              required
              disabled={isLoadingIdentitasUsulan}
            />
          </div>
        </div>
        <div className='flex w-full justify-end absolute -bottom-16 left-0'>
          <ButtonNext disabled={isLoadingSubmit} />
        </div>
      </form>
    </ContainerContent>
  );
};
