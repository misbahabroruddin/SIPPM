"use client";
import { useId } from "react";
import { Controller, useForm } from "react-hook-form";

import { ButtonCancel } from "@/components/button/button-cancel";
import { ButtonSave } from "@/components/button/button-save";
import { useQueryOptionsAnggotaDosen } from "@/handlers/anggota/query-anggota-dosen";
import { SingleSelect } from "@/components/select/single-select";
import { useAddAnggotaProposal } from "@/handlers/dosen/proposal/anggota/add-anggota";
import { useQueryAnggotaDosenProposal } from "@/handlers/dosen/proposal/anggota/query-anggota-dosen";

export const SelectDosen = ({ onClose }) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const id = useId();

  const { data, isLoading } = useQueryOptionsAnggotaDosen();

  const { onSubmitAnggotaDosen, isLoadingAnggotaDosen } = useAddAnggotaProposal(
    reset,
    onClose,
  );

  const { data: listAnggotaDosenPenelitian } = useQueryAnggotaDosenProposal();

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={handleSubmit(onSubmitAnggotaDosen)}
    >
      <SingleSelect
        label={"Nama Dosen"}
        Controller={Controller}
        control={control}
        options={data?.filter(
          (anggota) =>
            !listAnggotaDosenPenelitian?.data.find(
              (a) => a.anggota_id === anggota.value,
            ),
        )}
        placeholder={"Nama Dosen"}
        name="anggota_id"
        errors={errors.anggota_id}
        rules={{ required: "Wajib diisi" }}
        id={id}
        isLoading={isLoading}
        maxMenuHeight={180}
      />
      <div className="flex justify-center gap-6">
        <ButtonCancel iconLeft onClick={onClose} />
        <ButtonSave
          iconLeft
          disabled={isLoadingAnggotaDosen}
          isLoading={isLoadingAnggotaDosen}
        />
      </div>
    </form>
  );
};
