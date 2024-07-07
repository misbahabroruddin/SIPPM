"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useRestoreRumpunIlmu = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const restoreRumpunIlmu = async (id) => {
    try {
      await axios.put(`/data-referensi/rumpun-ilmus/trashs/${id}`);

      queryClient.invalidateQueries({
        queryKey: ["rumpun-ilmu"],
      });
      queryClient.invalidateQueries({
        queryKey: ["trash-rumpun-ilmu"],
      });
      toast.success("Data rumpun ilmu berhasil di-restore");
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const mutate = useMutation({
    mutationFn: (id) => restoreRumpunIlmu(id),
  });

  return { ...mutate };
};
