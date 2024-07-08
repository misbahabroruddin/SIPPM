"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useDeleteKriteriaPenilaian = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const deleteKriteriaPenilaian = async (id) => {
    try {
      await axios.delete(`/data-referensi/kriteria-penilaians/${id}`);
      queryClient.invalidateQueries({
        queryKey: ["kriteria-penilaian"],
      });
      queryClient.invalidateQueries({
        queryKey: ["trash-kriteria-penilaian"],
      });

      return toast.success("Data kriteria penilaian berhasil dihapus");
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const mutate = useMutation({
    mutationFn: (id) => deleteKriteriaPenilaian(id),
  });

  return { ...mutate };
};
