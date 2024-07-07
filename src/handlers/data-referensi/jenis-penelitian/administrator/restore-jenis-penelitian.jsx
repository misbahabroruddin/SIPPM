"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useRestoreJenisPenelitian = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const restoreJenisPenelitian = async (id) => {
    try {
      await axios.put(`/data-referensi/jenis-penelitians/trashs/${id}`);

      queryClient.invalidateQueries({
        queryKey: ["jenis-penelitian"],
      });
      queryClient.invalidateQueries({
        queryKey: ["trash-jenis-penelitian"],
      });
      toast.success("Data jenis penelitian berhasil di-restore");
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const mutate = useMutation({
    mutationFn: (id) => restoreJenisPenelitian(id),
  });

  return { ...mutate };
};
