"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useUploadKontrakLppm = (proposalId) => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const handleUploadKontrakLppm = async (form) => {
    try {
      const formData = new FormData();
      formData.append("file", form.file[0]);
      formData.append("proposal_id", proposalId);

      const { data } = await axios.post(
        "/dokumen/kontraks/upload/role/lppm",
        formData,
      );

      queryClient.invalidateQueries({ queryKey: ["dokumen-sk-lppm"] });

      queryClient.invalidateQueries({ queryKey: ["dokumen-kontrak-lppm"] });

      toast.success("Kontrak Berhasil terkirim");
      return data;
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const mutate = useMutation({
    mutationFn: handleUploadKontrakLppm,
  });

  return { ...mutate };
};
