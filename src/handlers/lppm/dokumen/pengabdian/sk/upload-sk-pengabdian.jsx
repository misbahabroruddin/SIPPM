"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

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
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const mutate = useMutation({
    mutationFn: handleUploadSKPengabdian,
  });

  return { ...mutate };
};
