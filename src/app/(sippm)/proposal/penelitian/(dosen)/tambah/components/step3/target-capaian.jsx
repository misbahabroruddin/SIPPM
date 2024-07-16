"use client";

import { useEffect, useId } from "react";
import { Controller, useForm } from "react-hook-form";

import { Input } from "@/components/input/input";
import { ButtonPrev } from "@/components/button/button-prev";
import { ButtonNext } from "@/components/button/button-next";
import { ContainerContent } from "@/components/container-content";
import { useStep } from "@/lib/hooks/useStep";
import { useQueryLuaranWajib } from "@/handlers/data-referensi/luaran-wajib/query-luaran-wajib";
import { SingleSelect } from "@/components/select/single-select";
import { styles } from "@/lib/utils/style-react-select";
import { useAddTargetCapaianProposal } from "@/handlers/dosen/proposal/target-capaian/add-target-capaian";
import { useQueryTargetCapaianProposal } from "@/handlers/dosen/proposal/target-capaian/query-target-capaian";

export const TargetCapaian = () => {
  const { currentStep, setCurrentStep } = useStep();
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();
  const id = useId();

  const { data: luaranWajibOptions, isLoading } = useQueryLuaranWajib();

  const {
    data,
    refetch,
    isLoading: isLoadingTargetCapaian,
  } = useQueryTargetCapaianProposal(setValue);

  const { mutateAsync: addTargetCapaian, isLoading: isLoadingSubmit } =
    useAddTargetCapaianProposal();

  useEffect(() => {
    const isEdit = JSON.parse(localStorage.getItem("isEdit"));
    if (currentStep === 3 && isEdit === true) {
      refetch();
    }
  }, [currentStep]);

  const handlePrevStep = () => {
    setCurrentStep(2);
    localStorage.setItem("step", 2);
    localStorage.setItem("isEdit", true);
  };
  return (
    <ContainerContent className="relative">
      <h1 className="text-base font-semibold text-primary lg:text-lg">
        Luaran dan Target Capaian
      </h1>
      <form onSubmit={handleSubmit(addTargetCapaian)}>
        <div className="flex flex-wrap gap-2 lg:flex-nowrap lg:gap-4">
          <div className="max-w-1/2 flex w-full flex-col gap-2 lg:gap-4 ">
            <SingleSelect
              label={"Luaran Wajib"}
              Controller={Controller}
              control={control}
              options={luaranWajibOptions}
              placeholder={data?.data?.luaran_wajib?.nama || "Luaran Wajib"}
              name="luaran_wajib_id"
              errors={errors.luaran_wajib_id}
              rules={{ required: "Wajib diisi" }}
              id={id}
              isLoading={isLoading}
              styles={styles(data?.data?.luaran_wajib?.nama)}
            />
            <Input
              type="number"
              label="Tahun Capaian"
              name="tahun_capaian"
              placeholder="Tahun Capaian"
              labelClass={"text-sm font-[500] text-primary w-full lg:w-1/2"}
              register={register("tahun_capaian", {
                required: "Wajib diisi",
              })}
              errors={errors.tahun_capaian}
              required
              disabled={isLoadingTargetCapaian}
            />
          </div>
          <div className="max-w-1/2 flex w-full flex-col gap-2 lg:gap-4">
            <Input
              label="Status Capaian"
              name="status_capaian"
              placeholder="Status Capaian"
              labelClass={"text-sm font-[500] text-primary w-full lg:w-1/2"}
              register={register("status_capaian")}
              required
              disabled
            />
            <Input
              label="Cluster Jurnal Penerbit"
              name="nama_jurnal_penerbit"
              placeholder="Nama Jurnal Penerbit"
              labelClass={"text-sm font-[500] text-primary w-full lg:w-1/2"}
              register={register("nama_jurnal_penerbit", {
                required: "Wajib diisi",
              })}
              errors={errors.nama_jurnal_penerbit}
              required
              disabled={isLoadingTargetCapaian}
            />
          </div>
        </div>
        <div className="absolute -bottom-16 left-0 mt-4 flex w-full items-center justify-between">
          <ButtonPrev
            onClick={handlePrevStep}
            className="w-[120px] lg:w-[200px]"
          />
          <ButtonNext
            disabled={isLoadingSubmit}
            className="w-[120px] lg:w-[200px]"
          />
        </div>
      </form>
    </ContainerContent>
  );
};
