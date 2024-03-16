"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useUploadSKPenelitian = (penelitianId) => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const handleUploadSKPenelitian = async (form) => {
    try {
      const formData = new FormData();
      formData.append("file_sk", form.file_sk[0]);
      formData.append("penelitian_id", penelitianId);

      const response = await axios.post(
        "/dokumens/lppms/penelitians/sks",
        formData,
      );
      queryClient.invalidateQueries({ queryKey: ["getSKPenelitianLPPM"] });
      queryClient.invalidateQueries({ queryKey: ["getKontrakPenelitianLPPM"] });
      queryClient.invalidateQueries({ queryKey: ["getSKPenelitianDosen"] });
      queryClient.invalidateQueries({
        queryKey: ["getKontrakPenelitianDosen"],
      });
      toast.success("SK Penelitian Berhasil terkirim");
      return response.data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const mutate = useMutation({
    mutationFn: handleUploadSKPenelitian,
  });

  return { ...mutate };
};