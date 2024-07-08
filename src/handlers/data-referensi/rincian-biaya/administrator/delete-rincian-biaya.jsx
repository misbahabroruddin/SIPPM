"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useDeleteRincianBiaya = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const deleteRincianBiaya = async (id) => {
    try {
      await axios.delete(`/data-referensi/rincian-biayas/${id}`);
      queryClient.invalidateQueries({
        queryKey: ["rincian-biaya"],
      });
      queryClient.invalidateQueries({
        queryKey: ["trash-rincian-biaya"],
      });

      return toast.success("Data rincian biaya berhasil dihapus");
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const mutate = useMutation({
    mutationFn: (id) => deleteRincianBiaya(id),
  });

  return { ...mutate };
};
