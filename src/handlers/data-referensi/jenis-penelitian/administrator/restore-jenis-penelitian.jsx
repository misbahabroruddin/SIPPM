"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useRestoreJenisPenelitian = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const restoreJenisPenelitian = async (id) => {
    try {
      await axios.put(`/data-referensis/jenis-penelitians/trashs/${id}`);

      queryClient.invalidateQueries({
        queryKey: ["jenis-penelitian"],
      });
      queryClient.invalidateQueries({
        queryKey: ["trash-jenis-penelitian"],
      });
      toast.success("Data program studi berhasil di-restore");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const mutate = useMutation({
    mutationFn: (id) => restoreJenisPenelitian(id),
  });

  return { ...mutate };
};
