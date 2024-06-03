"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useAdministratorDeleteAnggota = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const handleDeleteAnggota = async (id) => {
    try {
      const { data } = await axios.delete(`/anggotas/${id}`);
      queryClient.invalidateQueries({
        queryKey: ["anggotaDosenAdministrator"],
      });
      queryClient.invalidateQueries({
        queryKey: ["anggotaMahasiswaAdministrator"],
      });
      toast.success("Data anggota dosen berhasil dihapus");
      return data;
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const mutate = useMutation({
    mutationFn: (id) => handleDeleteAnggota(id),
  });

  return { ...mutate };
};
