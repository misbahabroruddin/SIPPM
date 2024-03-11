"use client";

import { useEffect, useId } from "react";
import { useForm, Controller } from "react-hook-form";

import { ButtonNext } from "@/components/button/button-next";
import { Input } from "@/components/input/input";
import { ContainerContent } from "@/components/container-content";
import { useStep } from "@/lib/hooks/useStep";
import { useQueryIdentitasUsulanPenelitian } from "@/handlers/dosen/penelitian/identitas-usulan/query-identitas-usulan-penelitian";
import { useQueryJenisPenelitians } from "@/handlers/data-referensi/jenis-penelitian/query-jenis-penelitian";
import { useQueryRumpunIlmu } from "@/handlers/data-referensi/rumpun-ilmu/query-rumpun-ilmu";
import { useAddIdentitasUsulanPenelitian } from "@/handlers/dosen/penelitian/identitas-usulan/add-identitas-usulan-penelitian";
import { SingleSelect } from "@/components/select/single-select";
import { styles } from "@/lib/utils/style-react-select";

export const IdentitasUsulan = () => {
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
    refecthIdentitasUsulanPenelitian();
  }, []);

  const selectedJenisPenelitian = jenisPenelitianOptions?.find(
    (c) => c.value === identitasUsulanPenelitian?.jenis_penelitian_id,
  );

  const selectedRumpunIlmu = rumpunIlmuOptions?.find(
    (c) => c.value === identitasUsulanPenelitian?.rumpun_ilmu_id,
  );

  return (
    <ContainerContent className="relative">
      <h1 className="text-lg font-semibold text-primary">Identitas Usulan</h1>
      <form onSubmit={handleSubmit(onSubmitIdentitasUsulanPenelitian)}>
        <div className="flex gap-4 ">
          <div className="flex grow flex-col gap-4">
            <Input
              label="Judul Penelitian"
              name="judul"
              placeholder="Judul Penelitian"
              register={register("judul", {
                required: "Wajib diisi",
              })}
              errors={errors.judul}
              required
              disabled={isLoadingIdentitasUsulanPenelitian}
            />
            <SingleSelect
              label={"Jenis Penelitian"}
              Controller={Controller}
              control={control}
              options={jenisPenelitianOptions}
              placeholder={
                selectedJenisPenelitian
                  ? selectedJenisPenelitian?.label
                  : "Jenis Penelitian"
              }
              name="jenis_penelitian_id"
              errors={errors.jenis_penelitian_id}
              rules={{ required: "Wajib diisi" }}
              id={id}
              isLoading={isLoadingJenisPenelitianOptions}
              styles={styles(selectedJenisPenelitian)}
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
            />
            <Input
              label="Bidang Fokus Penelitian"
              name="bidang_fokus"
              placeholder="Bidang Fokus Penelitian"
              register={register("bidang_fokus", {
                required: "Wajib diisi",
              })}
              errors={errors.bidang_fokus}
              required
              disabled={isLoadingIdentitasUsulanPenelitian}
            />
          </div>
          <div className="flex grow flex-col gap-4">
            <Input
              label="Tahun Usulan"
              type="number"
              name="tahun_usulan"
              placeholder="Tahun Usulan"
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
              label="Jangka Waktu Penelitian"
              name="jangka_waktu"
              placeholder="Jangka Waktu Penelitian"
              register={register("jangka_waktu", {
                required: "Wajib diisi",
              })}
              errors={errors.jangka_waktu}
              required
            />
            <Input
              label="Ringkasan Penelitian"
              name="ringkasan"
              placeholder="Ringkasan Penelitian"
              register={register("ringkasan", {
                required: "Wajib diisi",
              })}
              errors={errors.ringkasan}
              required
              disabled={isLoadingIdentitasUsulanPenelitian}
            />
          </div>
        </div>
        <div className="absolute -bottom-16 left-0 flex w-full justify-end">
          <ButtonNext disabled={isLoadingSubmit} />
        </div>
      </form>
    </ContainerContent>
  );
};
