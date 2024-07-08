"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useRestoreRincianBiaya = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const restoreRincianBiaya = async (id) => {
    try {
      await axios.put(`/data-referensi/rincian-biayas/trashs/${id}`);

      queryClient.invalidateQueries({
        queryKey: ["rincian-biaya"],
      });
      queryClient.invalidateQueries({
        queryKey: ["trash-rincian-biaya"],
      });
      toast.success("Data rincian biaya berhasil direstore");
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const mutate = useMutation({
    mutationFn: (id) => restoreRincianBiaya(id),
  });

  return { ...mutate };
};
