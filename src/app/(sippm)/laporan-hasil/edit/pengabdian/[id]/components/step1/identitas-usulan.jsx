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
import { SingleSelect } from "@/components/select/single-select";
import { styles } from "@/lib/utils/style-react-select";
import { useParams } from "next/navigation";
import { useQueryIdentitasUsulanPKM } from "@/handlers/dosen/pengabdian/identitas-usulan/query-identitas-usulan-pkm";

export const IdentitasUsulanPKM = () => {
  const { setCurrentStep } = useStep();

  const id = useId();

  const pengabdianId = useParams();

  const { register, control, setValue } = useForm();

  const { data: rumpunIlmuOptions } = useQueryRumpunIlmu();

  const { data: identitasUsulan, refetch } =
    useQueryIdentitasUsulanPKM(setValue);

  const handleNextStep = () => {
    setCurrentStep(2);
    localStorage.setItem("step", 2);
  };

  const selectedRumpunIlmu = rumpunIlmuOptions?.find(
    (c) => c.value === identitasUsulan?.rumpun_ilmu_id,
  );

  useEffect(() => {
    setValue("rumpun_ilmu_id", identitasUsulan?.rumpun_ilmu.id, {
      shouldValidate: true,
    });
    setValue("judul", identitasUsulan?.judul);
    setValue("tahun_usulan", identitasUsulan?.tahun_usulan);
    setValue("jangka_waktu", identitasUsulan?.jangka_waktu);
    setValue("ringkasan", identitasUsulan?.ringkasan);
    refetch();
  }, [identitasUsulan, pengabdianId]);

  return (
    <ContainerContent className="relative">
      <h1 className="text-lg font-semibold text-primary">Identitas Usulan</h1>
      <div className="flex gap-4 ">
        <div className="flex grow flex-col gap-4">
          <Input
            label="Judul PKM"
            name="judul"
            placeholder="Judul PKM"
            defaultValue={identitasUsulan?.judul}
            register={register("judul")}
            required
            disabled
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
            id={id}
            isDisabled
            styles={styles(selectedRumpunIlmu)}
          />
          <Input
            label="Tahun Usulan"
            type="number"
            name="tahun_usulan"
            placeholder="Tahun Usulan"
            defaultValue={identitasUsulan?.tahun_usulan}
            register={register("tahun_usulan")}
            required
            disabled
          />
        </div>
        <div className="flex grow flex-col gap-4">
          <Input
            label="Jangka Waktu PKM"
            name="jangka_waktu"
            placeholder="Jangka Waktu PKM"
            defaultValue={identitasUsulan?.jangka_waktu}
            register={register("jangka_waktu")}
            required
            disabled
          />
          <Input
            label="Ringkasan PKM"
            name="ringkasan"
            placeholder="Ringkasan PKM"
            defaultValue={identitasUsulan?.ringkasan}
            register={register("ringkasan")}
            required
            disabled
          />
        </div>
      </div>
      <div className="absolute -bottom-16 left-0 flex w-full justify-end">
        <ButtonNext onClick={handleNextStep} />
      </div>
    </ContainerContent>
  );
};
