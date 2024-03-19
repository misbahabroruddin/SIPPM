"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useRestoreKabupaten = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const restoreKabupaten = async (id) => {
    try {
      await axios.put(`/data-referensis/kabupatens/trashs/${id}`);

      queryClient.invalidateQueries({
        queryKey: ["kabupaten"],
      });
      queryClient.invalidateQueries({
        queryKey: ["trash-kabupaten"],
      });
      toast.success("Data kabupaten berhasil di-restore");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const mutate = useMutation({
    mutationFn: (id) => restoreKabupaten(id),
  });

  return { ...mutate };
};
