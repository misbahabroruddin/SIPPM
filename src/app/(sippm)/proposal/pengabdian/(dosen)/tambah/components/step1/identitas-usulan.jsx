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
import { useQueryIdentitasUsulanPKM } from "@/handlers/dosen/pengabdian/identitas-usulan/query-identitas-usulan-pkm";
import { useAddIdentitasUsulanPKM } from "@/handlers/dosen/pengabdian/identitas-usulan/add-identitas-usulan";
import { SingleSelect } from "@/components/select/single-select";
import { styles } from "@/lib/utils/style-react-select";

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

  const selectedRumpunIlmu = rumpunIlmuOptions?.find(
    (c) => c.value === identitasUsulan?.rumpun_ilmu_id,
  );

  return (
    <ContainerContent className="relative">
      <h1 className="text-lg font-semibold text-primary">Identitas Usulan</h1>
      <form onSubmit={handleSubmit(onSubmitIdentitasUsulan)}>
        <div className="flex gap-4 ">
          <div className="flex grow flex-col gap-4">
            <Input
              label="Judul PKM"
              name="judul"
              placeholder="Judul PKM"
              defaultValue={identitasUsulan?.judul}
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
            />
            <Input
              label="Tahun Usulan"
              type="number"
              name="tahun_usulan"
              placeholder="Tahun Usulan"
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
              label="Jangka Waktu PKM"
              name="jangka_waktu"
              placeholder="Jangka Waktu PKM"
              defaultValue={identitasUsulan?.jangka_waktu}
              register={register("jangka_waktu", {
                required: "Wajib diisi",
              })}
              errors={errors.jangka_waktu}
              required
            />
            <Input
              label="Ringkasan PKM"
              name="ringkasan"
              placeholder="Ringkasan PKM"
              defaultValue={identitasUsulan?.ringkasan}
              register={register("ringkasan", {
                required: "Wajib diisi",
              })}
              errors={errors.ringkasan}
              required
              disabled={isLoadingIdentitasUsulan}
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
