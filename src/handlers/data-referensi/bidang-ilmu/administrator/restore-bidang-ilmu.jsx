"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useRestoreBidangIlmu = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const restoreBidangIlmu = async (id) => {
    try {
      await axios.put(`/data-referensis/bidang-ilmus/trashs/${id}`);

      queryClient.invalidateQueries({
        queryKey: ["bidang-ilmu"],
      });
      queryClient.invalidateQueries({
        queryKey: ["trash-bidang-ilmu"],
      });
      toast.success("Data bidang ilmu berhasil di-restore");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const mutate = useMutation({
    mutationFn: (id) => restoreBidangIlmu(id),
  });

  return { ...mutate };
};
