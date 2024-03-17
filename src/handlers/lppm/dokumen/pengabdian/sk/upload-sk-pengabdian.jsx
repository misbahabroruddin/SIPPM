"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useUploadSKPengabdian = (pengabdianId) => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const handleUploadSKPengabdian = async (form) => {
    try {
      const formData = new FormData();
      formData.append("file_sk", form.file_sk[0]);
      formData.append("pkm_id", pengabdianId);

      const response = await axios.post("/dokumens/lppms/pkms/sks", formData);
      queryClient.invalidateQueries({ queryKey: ["getSKPengabdianLPPM"] });
      queryClient.invalidateQueries({ queryKey: ["getKontrakPengabdianLPPM"] });
      queryClient.invalidateQueries({ queryKey: ["getSKPengabdianDosen"] });
      queryClient.invalidateQueries({
        queryKey: ["getKontrakPengabdianDosen"],
      });
      toast.success("SK Pengabdian Berhasil terkirim");
      return response.data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const mutate = useMutation({
    mutationFn: handleUploadSKPengabdian,
  });

  return { ...mutate };
};
