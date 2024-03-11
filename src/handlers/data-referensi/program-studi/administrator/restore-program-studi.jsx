"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useRestoreProgramStudi = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const restoreProgramStudi = async (id) => {
    try {
      await axios.put(`/data-referensis/program-studis/trashs/${id}`);

      queryClient.invalidateQueries({
        queryKey: ["program-studi"],
      });
      queryClient.invalidateQueries({
        queryKey: ["trash-program-studi"],
      });
      toast.success("Data program studi berhasil direstore");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const mutate = useMutation({
    mutationFn: (id) => restoreProgramStudi(id),
  });

  return { ...mutate };
};
