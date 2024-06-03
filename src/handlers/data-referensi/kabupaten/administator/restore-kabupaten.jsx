"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
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
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const mutate = useMutation({
    mutationFn: (id) => restoreKabupaten(id),
  });

  return { ...mutate };
};
