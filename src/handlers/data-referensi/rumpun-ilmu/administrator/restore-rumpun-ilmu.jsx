"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useRestoreRumpunIlmu = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const restoreRumpunIlmu = async (id) => {
    try {
      await axios.put(`/data-referensis/rumpun-ilmus/trashs/${id}`);

      queryClient.invalidateQueries({
        queryKey: ["rumpun-ilmu"],
      });
      queryClient.invalidateQueries({
        queryKey: ["trash-rumpun-ilmu"],
      });
      toast.success("Data rumpun ilmu berhasil di-restore");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const mutate = useMutation({
    mutationFn: (id) => restoreRumpunIlmu(id),
  });

  return { ...mutate };
};
