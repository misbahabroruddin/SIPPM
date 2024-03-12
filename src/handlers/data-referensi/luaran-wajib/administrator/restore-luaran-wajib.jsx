"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useRestoreLuaranWajib = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const restoreLuaranWajib = async (id) => {
    try {
      await axios.put(`/data-referensis/luaran-wajibs/trashs/${id}`);

      queryClient.invalidateQueries({
        queryKey: ["luaran-wajib"],
      });
      queryClient.invalidateQueries({
        queryKey: ["trash-luaran-wajib"],
      });
      toast.success("Data luaran wajib berhasil di-restore");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const mutate = useMutation({
    mutationFn: (id) => restoreLuaranWajib(id),
  });

  return { ...mutate };
};
