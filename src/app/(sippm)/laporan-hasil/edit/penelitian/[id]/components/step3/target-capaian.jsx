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
import { useQueryTargetCapaianProposal } from "@/handlers/proposal/target-capaian/query-target-capaian";
import { useAddTargetCapaianProposal } from "@/handlers/proposal/target-capaian/add-target-capaian";
import { STATUS_CAPAIAN_OPTIONS } from "@/lib/datas/proposal";

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
    isLoading: isLoadingTargetCapaian,
    refetch,
  } = useQueryTargetCapaianProposal();

  const {
    mutateAsync: addTargetCapaianPenelitian,
    isPending: isLoadingSubmit,
  } = useAddTargetCapaianProposal();

  const handlePrevStep = () => {
    setCurrentStep(2);
    localStorage.setItem("step", 2);
    localStorage.setItem("isEdit", true);
  };

  useEffect(() => {
    setValue("luaran_wajib_id", data?.data?.luaran_wajib_id);
    setValue("tahun_capaian", data?.data?.tahun_capaian);
    setValue(
      "status_capaian",
      data?.data?.status_capaian === "null" ? "" : data?.data?.status_capaian,
    );
    setValue("nama_jurnal_penerbit", data?.data?.nama_jurnal_penerbit);

    refetch();
  }, [data, currentStep]);

  return (
    <ContainerContent className="relative">
      <h1 className="text-lg font-semibold text-primary">
        Luaran dan Target Capaian
      </h1>
      <form onSubmit={handleSubmit(addTargetCapaianPenelitian)}>
        <div className="flex gap-4">
          <div className="max-w-1/2 flex w-full flex-col gap-4 ">
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
              disabled={isLoadingTargetCapaian}
              required
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
              disabled={isLoadingTargetCapaian}
            />
          </div>
          <div className="max-w-1/2 flex w-full flex-col gap-4">
            <SingleSelect
              label={"Status Capaian"}
              Controller={Controller}
              control={control}
              options={STATUS_CAPAIAN_OPTIONS}
              placeholder={
                data?.data?.status_capaian
                  ? data?.data?.status_capaian
                  : "Status Capaian"
              }
              errors={errors.status_capaian}
              name={"status_capaian"}
              id={id}
              rules={{ required: "Wajib diisi" }}
              styles={styles(data?.data?.status_capaian)}
              disabled={isLoadingTargetCapaian}
              required
            />
            <Input
              label="Cluster Jurnal Penerbit"
              name="nama_jurnal_penerbit"
              placeholder="Nama Jurnal Penerbit"
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
          <ButtonPrev onClick={handlePrevStep} />
          <ButtonNext disabled={isLoadingSubmit} />
        </div>
      </form>
    </ContainerContent>
  );
};
