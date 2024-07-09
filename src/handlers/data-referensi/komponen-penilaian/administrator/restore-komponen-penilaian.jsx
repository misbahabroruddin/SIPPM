"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useRestoreKomponenPenilaian = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const restoreKomponenPenilaian = async (id) => {
    try {
      await axios.put(`/data-referensi/komponen-penilaians/trashs/${id}`);

      queryClient.invalidateQueries({
        queryKey: ["komponen-penilaian"],
      });
      queryClient.invalidateQueries({
        queryKey: ["trash-komponen-penilaian"],
      });
      toast.success("Data komponen penilaian berhasil direstore");
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const mutate = useMutation({
    mutationFn: (id) => restoreKomponenPenilaian(id),
  });

  return { ...mutate };
};
