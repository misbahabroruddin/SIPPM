"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

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
      toast.error(error.message);
    }
  };

  const mutate = useMutation({
    mutationFn: (id) => handleDeleteAnggota(id),
  });

  return { ...mutate };
};
