"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useUploadSK = (proposalId) => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const handleUploadSK = async (form) => {
    try {
      const formData = new FormData();
      formData.append("file", form.file[0]);
      formData.append("proposal_id", proposalId);

      const response = await axios.post("/dokumen/sks/upload", formData);

      queryClient.invalidateQueries({
        queryKey: ["dokumen-sk-lppm", "penelitian"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dokumen-sk-lppm", "pengabdian"],
      });

      queryClient.invalidateQueries({ queryKey: ["dokumen-kontrak-lppm"] });

      queryClient.invalidateQueries({
        queryKey: ["dokumen-sk-dosen", "penelitian"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dokumen-sk-dosen", "pengabdian"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dokumen-kontrak-dosen"],
      });
      toast.success("SK Berhasil terkirim");
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const mutate = useMutation({
    mutationFn: handleUploadSK,
  });

  return { ...mutate };
};
