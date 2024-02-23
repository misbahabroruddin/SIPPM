"use client";

import { useEffect, useId } from "react";
import { useForm, Controller } from "react-hook-form";

import { ButtonNext } from "@/components/button/button-next";
import { Input } from "@/components/input/input";
import { ContainerContent } from "@/components/container-content";
import { useStep } from "@/lib/hooks/useStep";
import { useQueryJenisPenelitians } from "@/handlers/data-referensi/jenis-penelitian/query-jenis-penelitian";
import { useQueryRumpunIlmu } from "@/handlers/data-referensi/rumpun-ilmu/query-rumpun-ilmu";
import { useQueryIdentitasUsulanPenelitian } from "@/handlers/penelitian/identitas-usulan/query-identitas-usulan-penelitian";
import { useAddIdentitasUsulanPenelitian } from "@/handlers/penelitian/identitas-usulan/add-identitas-usulan-penelitian";
import { SingleSelect } from "@/components/select/single-select";

export const IdentitasUsulan = () => {
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

  const { jenisPenelitianOptions, isLoadingJenisPenelitianOptions } =
    useQueryJenisPenelitians();

  const { data: rumpunIlmuOptions, isLoading: isLoadingRumpunIlmu } =
    useQueryRumpunIlmu();

  const {
    identitasUsulanPenelitian,
    isLoadingIdentitasUsulanPenelitian,
    refecthIdentitasUsulanPenelitian,
  } = useQueryIdentitasUsulanPenelitian(setValue);

  const { onSubmitIdentitasUsulanPenelitian, isLoadingSubmit } =
    useAddIdentitasUsulanPenelitian(reset);

  useEffect(() => {
    const isEdit = JSON.parse(localStorage.getItem("isEdit"));

    if (isEdit && currentStep === 1) {
      refecthIdentitasUsulanPenelitian();
    }
  }, []);

  return (
    <ContainerContent className='relative'>
      <h1 className='text-primary font-semibold text-lg'>Identitas Usulan</h1>
      <form onSubmit={handleSubmit(onSubmitIdentitasUsulanPenelitian)}>
        <div className='flex gap-4 '>
          <div className='flex flex-col gap-4 grow'>
            <Input
              label='Judul Penelitian'
              name='judul_penelitian'
              placeholder='Judul Penelitian'
              register={register("judul_penelitian", {
                required: "Wajib diisi",
              })}
              errors={errors.judul_penelitian}
              required
              disabled={isLoadingIdentitasUsulanPenelitian}
            />
            <SingleSelect
              label={"Jenis Penelitian"}
              Controller={Controller}
              control={control}
              options={jenisPenelitianOptions}
              placeholder={
                jenisPenelitianOptions?.find(
                  (c) =>
                    c.value === identitasUsulanPenelitian?.jenis_penelitian_id
                )?.label || "Jenis Penelitian"
              }
              name='jenis_penelitian_id'
              errors={errors.jenis_penelitian_id}
              rules={{ required: "Wajib diisi" }}
              id={id}
              isLoading={isLoadingJenisPenelitianOptions}
            />
            <SingleSelect
              label={"Rumpun ilmu"}
              Controller={Controller}
              control={control}
              options={rumpunIlmuOptions}
              placeholder={
                rumpunIlmuOptions?.find(
                  (c) => c.value === identitasUsulanPenelitian?.rumpun_ilmu_id
                )?.label || "Rumpun Ilmu"
              }
              name='rumpun_ilmu_id'
              errors={errors.rumpun_ilmu_id}
              rules={{ required: "Wajib diisi" }}
              id={id}
              isLoading={isLoadingRumpunIlmu}
            />
            <Input
              label='Bidang Fokus Penelitian'
              name='bidang_fokus_penelitian'
              placeholder='Bidang Fokus Penelitian'
              register={register("bidang_fokus_penelitian", {
                required: "Wajib diisi",
              })}
              errors={errors.bidang_fokus_penelitian}
              required
              disabled={isLoadingIdentitasUsulanPenelitian}
            />
          </div>
          <div className='flex flex-col gap-4 grow'>
            <Input
              label='Tahun Usulan'
              type='number'
              name='tahun_usulan'
              placeholder='Tahun Usulan'
              register={register("tahun_usulan", {
                required: "Wajib diisi",
                max: {
                  value: new Date().getFullYear(),
                  message: "Tahun Usulan tidak boleh melebihi tahun sekarang",
                },
              })}
              errors={errors.tahun_usulan}
              required
              disabled={isLoadingIdentitasUsulanPenelitian}
            />
            <Input
              label='Jangka Waktu Penelitian'
              name='jangka_waktu_penelitian'
              placeholder='Jangka Waktu Penelitian'
              register={register("jangka_waktu_penelitian", {
                required: "Wajib diisi",
              })}
              errors={errors.jangka_waktu_penelitian}
              required
            />
            <Input
              label='Ringkasan Penelitian'
              name='ringkasan_penelitian'
              placeholder='Ringkasan Penelitian'
              register={register("ringkasan_penelitian", {
                required: "Wajib diisi",
              })}
              errors={errors.ringkasan_penelitian}
              required
              disabled={isLoadingIdentitasUsulanPenelitian}
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
