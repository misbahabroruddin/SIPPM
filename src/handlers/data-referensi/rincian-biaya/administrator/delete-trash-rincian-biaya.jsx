"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useDeleteTrashRincianBiaya = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const deleteTrashRincianBiaya = async (id) => {
    try {
      await axios.delete(`/data-referensi/rincian-biayas/trashs/${id}`);

      queryClient.invalidateQueries({
        queryKey: ["trash-rincian-biaya"],
      });
      queryClient.removeQueries({
        queryKey: ["rincian-biaya", id],
      });
      toast.success("Data berhasil dihapus");
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const mutate = useMutation({
    mutationFn: (id) => deleteTrashRincianBiaya(id),
  });

  return { ...mutate };
};
