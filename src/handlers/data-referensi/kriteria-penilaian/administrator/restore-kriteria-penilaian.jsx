"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useRestoreKriteriaPenilaian = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const restoreKriteriaPenilaian = async (id) => {
    try {
      await axios.put(`/data-referensi/kriteria-penilaians/trashs/${id}`);

      queryClient.invalidateQueries({
        queryKey: ["kriteria-penilaian"],
      });
      queryClient.invalidateQueries({
        queryKey: ["trash-kriteria-penilaian"],
      });
      toast.success("Data kriteria penilaian berhasil direstore");
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const mutate = useMutation({
    mutationFn: (id) => restoreKriteriaPenilaian(id),
  });

  return { ...mutate };
};
