"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useUploadKontrakPenelitian = (penelitianId) => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const handleUploadKontrakPenelitian = async (form) => {
    try {
      const formData = new FormData();
      formData.append("file_kontrak", form.file_kontrak[0]);
      formData.append("penelitian_id", penelitianId);

      const response = await axios.post(
        "/dokumens/lppms/penelitians/kontraks",
        formData,
      );
      queryClient.invalidateQueries({ queryKey: ["getSKPenelitianLPPM"] });
      queryClient.invalidateQueries({ queryKey: ["getKontrakPenelitianLPPM"] });
      queryClient.invalidateQueries({ queryKey: ["getSKPenelitianDosen"] });
      queryClient.invalidateQueries({
        queryKey: ["getKontrakPenelitianDosen"],
      });
      toast.success("Kontrak Penelitian Berhasil terkirim");
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const mutate = useMutation({
    mutationFn: handleUploadKontrakPenelitian,
  });

  return { ...mutate };
};
