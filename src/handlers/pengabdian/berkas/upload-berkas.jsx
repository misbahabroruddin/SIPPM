"use client";

import { useParams } from "next/navigation";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { useStep } from "@/lib/hooks/useStep";

export const useUploadBerkasPKM = (router) => {
  const { setCurrentStep } = useStep();
  const axios = useAxios();
  const { id } = useParams();

  const onSubmit = async (form) => {
    const formData = new FormData();
    formData.append("file_cv", form.file_cv[0]);
    formData.append("file_proposal", form.file_proposal[0]);
    if (form.file_pernyataan_mitra) {
      formData.append("file_pernyataan_mitra", form.file_pernyataan_mitra[0]);
    }

    try {
      const pengabdianId = localStorage.getItem("pengabdianId");
      const { data } = await axios.post(
        `/proposals/dosen/pkms/${pengabdianId || id}/berkas`,
        formData
      );
      localStorage.removeItem("pengabdianId");
      localStorage.removeItem("step");
      localStorage.removeItem("isEdit");
      router.push("/proposal");
      toast.success("PKM berhasil diajukan");
      return data;
    } catch (error) {
      if (error.response?.data.message.file_cv) {
        return toast.error(error.response.data.message.file_cv[0]);
      } else if (error.response?.data.message.file_proposal) {
        return toast.error(error.response.data.message.file_proposal[0]);
      } else if (error.response?.data.message.file_pernyataan_mitra) {
        return toast.error(
          error.response.data.message.file_pernyataan_mitra[0]
        );
      } else {
        toast.error(error.message);
      }
    }
  };

  const { mutateAsync: uploadBerkas, isPending } = useMutation({
    mutationFn: onSubmit,
    onSuccess: () => {
      setCurrentStep(1);
    },
  });

  return {
    uploadBerkas,
    isPending,
  };
};
