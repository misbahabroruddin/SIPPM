"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useUploadKontrakDosen = (proposalId) => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const handleUploadKontrak = async (form) => {
    try {
      const formData = new FormData();
      formData.append("file", form.file[0]);
      formData.append("proposal_id", proposalId);

      const { data } = await axios.post(
        "/dokumen/kontraks/upload/role/dosen",
        formData,
      );

      queryClient.invalidateQueries({
        queryKey: ["dokumen-sk-dosen", "penelitian"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dokumen-sk-dosen", "pengabdian"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dokumen-kontrak-dosen"],
      });
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
    mutationFn: handleUploadKontrak,
  });

  return { ...mutate };
};
