"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
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
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const mutate = useMutation({
    mutationFn: (id) => restoreJabatanFungsional(id),
  });

  return { ...mutate };
};
