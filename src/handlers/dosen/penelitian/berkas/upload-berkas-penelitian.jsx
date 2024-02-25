"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";
import { useStep } from "@/lib/hooks/useStep";
import { useParams } from "next/navigation";
import { useKirimUsulanPenelitian } from "../kirim-usulan/kirim-usulan-penelitian";

export const useUploadBerkasPenelitian = (router) => {
  const axios = useAxios();
  const { setCurrentStep } = useStep();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { kirimUsulan } = useKirimUsulanPenelitian();

  const onSubmit = async (form) => {
    const formData = new FormData();
    formData.append("file_cv", form.file_cv[0]);
    formData.append("file_proposal", form.file_proposal[0]);
    formData.append("file_pernyataan_mitra", form.file_pernyataan_mitra[0]);

    try {
      const penelitianId = localStorage.getItem("penelitianId");
      const { data } = await axios.post(
        `/proposals/dosens/penelitians/${penelitianId || id}/berkas`,
        formData,
      );
      localStorage.removeItem("penelitianId");
      localStorage.removeItem("step");
      localStorage.removeItem("isEdit");
      await kirimUsulan();
      router.push("/proposal");
      setCurrentStep(1);
      toast.success("Penelitian berhasil diajukan");
      return data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const { mutateAsync: uploadBerkas, isPending: isLoadingSubmit } = useMutation(
    {
      mutationFn: onSubmit,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["listPenelitian"],
        });
        queryClient.resetQueries({
          queryKey: ["anggotaMahasiswa"],
        });
        queryClient.resetQueries({
          queryKey: ["anggotaDosen"],
        });
      },
    },
  );

  return {
    uploadBerkas,
    isLoadingSubmit,
  };
};
