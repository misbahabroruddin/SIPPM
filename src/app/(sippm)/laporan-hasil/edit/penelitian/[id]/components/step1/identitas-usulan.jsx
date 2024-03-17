"use client";

import { useEffect, useId } from "react";
import { useParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";

import { ButtonNext } from "@/components/button/button-next";
import { Input } from "@/components/input/input";
import { ContainerContent } from "@/components/container-content";
import { useQueryRumpunIlmu } from "@/handlers/data-referensi/rumpun-ilmu/query-rumpun-ilmu";
import { SingleSelect } from "@/components/select/single-select";
import { styles } from "@/lib/utils/style-react-select";
import { useQueryIdentitasUsulanLaporanHasilPenelitian } from "@/handlers/dosen/laporan-hasil/penelitian/identitas-usulan/query-identitas-usulan-laporan-hasil-penelitian";
import { useQueryJenisPenelitians } from "@/handlers/data-referensi/jenis-penelitian/query-jenis-penelitian";
import { useStep } from "@/lib/hooks/useStep";

export const IdentitasUsulan = () => {
  const id = useId();
  const penelitiandId = useParams();
  const { register, control, setValue } = useForm();
  const { setCurrentStep } = useStep();

  const { jenisPenelitianOptions } = useQueryJenisPenelitians();

  const { data: rumpunIlmuOptions } = useQueryRumpunIlmu();

  const { identitasUsulanPenelitian, refecthIdentitasUsulanPenelitian } =
    useQueryIdentitasUsulanLaporanHasilPenelitian();

  useEffect(() => {
    setValue("judul", identitasUsulanPenelitian?.judul);
    setValue(
      "jenis_penelitian_id",
      identitasUsulanPenelitian?.jenis_penelitian.id,
      {
        shouldValidate: true,
      },
    );
    setValue("rumpun_ilmu_id", identitasUsulanPenelitian?.rumpun_ilmu.id, {
      shouldValidate: true,
    });
    setValue("bidang_fokus", identitasUsulanPenelitian?.bidang_fokus);
    setValue("tahun_usulan", identitasUsulanPenelitian?.tahun_usulan);
    setValue("jangka_waktu", identitasUsulanPenelitian?.jangka_waktu);
    setValue("ringkasan", identitasUsulanPenelitian?.ringkasan);

    refecthIdentitasUsulanPenelitian();
  }, [identitasUsulanPenelitian, penelitiandId]);

  const selectedJenisPenelitian = jenisPenelitianOptions?.find(
    (c) => c.value === identitasUsulanPenelitian?.jenis_penelitian_id,
  );

  const selectedRumpunIlmu = rumpunIlmuOptions?.find(
    (c) => c.value === identitasUsulanPenelitian?.rumpun_ilmu_id,
  );

  return (
    <ContainerContent className="relative">
      <h1 className="text-lg font-semibold text-primary">Identitas Usulan</h1>
      <div className="flex gap-4 ">
        <div className="flex grow flex-col gap-4">
          <Input
            label="Judul Penelitian"
            name="judul"
            placeholder="Judul Penelitian"
            register={register("judul")}
            required
            disabled={true}
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
            id={id}
            isDisabled={true}
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
            id={id}
            isDisabled={true}
            styles={styles(selectedRumpunIlmu)}
            disabled={true}
          />
          <Input
            label="Bidang Fokus Penelitian"
            name="bidang_fokus"
            placeholder="Bidang Fokus Penelitian"
            register={register("bidang_fokus")}
            required
            disabled={true}
          />
        </div>
        <div className="flex grow flex-col gap-4">
          <Input
            label="Tahun Usulan"
            type="number"
            name="tahun_usulan"
            placeholder="Tahun Usulan"
            register={register("tahun_usulan")}
            required
            disabled={true}
          />
          <Input
            label="Jangka Waktu Penelitian"
            name="jangka_waktu"
            placeholder="Jangka Waktu Penelitian"
            register={register("jangka_waktu")}
            required
            disabled={true}
          />
          <Input
            label="Ringkasan Penelitian"
            name="ringkasan"
            placeholder="Ringkasan Penelitian"
            register={register("ringkasan")}
            required
            disabled={true}
          />
        </div>
      </div>
      <div className="absolute -bottom-16 left-0 flex w-full justify-end">
        <ButtonNext onClick={() => setCurrentStep(2)} />
      </div>
    </ContainerContent>
  );
};
