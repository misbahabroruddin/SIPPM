"use client";

import { useEffect, useId } from "react";
import ReactSelect from "react-select";
import { Controller, useForm } from "react-hook-form";

import { Label } from "@/components/label";
import { Input } from "@/components/input/input";
import { ButtonPrev } from "@/components/button/button-prev";
import { ButtonNext } from "@/components/button/button-next";
import { ContainerContent } from "@/components/container-content";
import { useStep } from "@/lib/hooks/useStep";
import { useQueryLuaranWajib } from "@/handlers/data-referensi/luaran-wajib/query-luaran-wajib";
import { useQueryTargetCapaianPKM } from "@/handlers/dosen/pengabdian/target-capaian/query-target-capaian-pkm";
import { useAddTargetCapaianPKM } from "@/handlers/dosen/pengabdian/target-capaian/add-target-capaian-pkm";
import { SingleSelect } from "@/components/select/single-select";

export const TargetCapaianPKM = () => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();
  const id = useId();
  const { currentStep, setCurrentStep } = useStep();

  const { data: luaranWajibOptions, isLoading } = useQueryLuaranWajib();

  const { data, refetch } = useQueryTargetCapaianPKM(setValue);

  useEffect(() => {
    if (currentStep === 3) {
      refetch();
    }
  }, [currentStep]);

  const { addTargetCapaianPKM, isPending } = useAddTargetCapaianPKM();

  const handlePrevStep = () => {
    setCurrentStep(2);
    localStorage.setItem("step", 2);
    localStorage.setItem("isEdit", true);
  };
  return (
    <ContainerContent className="relative">
      <h1 className="text-lg font-semibold text-primary">
        Luaran dan Target Capaian
      </h1>
      <form onSubmit={handleSubmit(addTargetCapaianPKM)}>
        <div className="flex gap-4">
          <div className="max-w-1/2 flex w-full flex-col gap-4 ">
            <SingleSelect
              label={"Luaran Wajib"}
              Controller={Controller}
              control={control}
              options={luaranWajibOptions}
              placeholder={data?.data?.luaran_wajib.nama || "Luaran Wajib"}
              name="luaran_wajib_id"
              errors={errors.luaran_wajib_id}
              rules={{ required: "Wajib diisi" }}
              id={id}
              isLoading={isLoading}
            />
            <Input
              type="number"
              label="Tahun Capaian"
              name="tahun_capaian"
              placeholder="Tahun Capaian"
              register={register("tahun_capaian", {
                required: "Wajib diisi",
              })}
              errors={errors.tahun_capaian}
              required
            />
          </div>
          <div className="max-w-1/2 flex w-full flex-col gap-4">
            <Input
              label="Status Capaian"
              name="status_capaian"
              placeholder="Status Capaian"
              errors={errors.status_capaian}
              required
              disabled
            />
            <Input
              label="Cluster Jurnal Penerbit"
              name="nama_jurnal_penerbit"
              placeholder="Cluster Jurnal Penerbit"
              register={register("nama_jurnal_penerbit", {
                required: "Wajib diisi",
              })}
              errors={errors.nama_jurnal_penerbit}
              required
            />
          </div>
        </div>
        <div className="absolute -bottom-16 left-0 mt-4 flex w-full items-center justify-between">
          <ButtonPrev onClick={handlePrevStep} />
          <ButtonNext disabled={isPending} />
        </div>
      </form>
    </ContainerContent>
  );
};