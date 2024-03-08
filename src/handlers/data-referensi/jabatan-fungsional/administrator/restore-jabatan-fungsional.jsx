"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useRestoreJabatanFungsional = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const restoreJabatanFungsional = async (id) => {
    try {
      await axios.put(`/data-referensis/jabatan-fungsionals/trashs/${id}`);

      queryClient.invalidateQueries({
        queryKey: ["jabatan-fungsional"],
      });
      queryClient.invalidateQueries({
        queryKey: ["trash-jabatan-fungsional"],
      });
      toast.success("Data jabatan fungsional berhasil direstore");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const mutate = useMutation({
    mutationFn: (id) => restoreJabatanFungsional(id),
  });

  return { ...mutate };
};
