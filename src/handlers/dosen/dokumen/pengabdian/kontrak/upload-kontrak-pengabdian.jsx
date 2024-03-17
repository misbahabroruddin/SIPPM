"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useUploadKontrakPengabdian = (pengabdianId) => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const handleUploadKontrakPengabdian = async (form) => {
    try {
      const formData = new FormData();
      formData.append("file_kontrak", form.file_kontrak[0]);
      formData.append("pkm_id", pengabdianId);

      const response = await axios.post(
        "/dokumens/dosens/pkms/kontraks",
        formData,
      );
      queryClient.invalidateQueries({ queryKey: ["getSKPengabdianLPPM"] });
      queryClient.invalidateQueries({ queryKey: ["getKontrakPengabdianLPPM"] });
      queryClient.invalidateQueries({ queryKey: ["getSKPengabdianDosen"] });
      queryClient.invalidateQueries({
        queryKey: ["getKontrakPengabdianDosen"],
      });
      toast.success("Kontrak Pengabdian Berhasil terkirim");
      return response.data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const mutate = useMutation({
    mutationFn: handleUploadKontrakPengabdian,
  });

  return { ...mutate };
};
