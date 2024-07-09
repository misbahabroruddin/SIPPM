"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useDeleteKomponenPenilaian = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const deleteKomponenPenilaian = async (id) => {
    try {
      await axios.delete(`/data-referensi/komponen-penilaians/${id}`);
      queryClient.invalidateQueries({
        queryKey: ["komponen-penilaian"],
      });
      queryClient.invalidateQueries({
        queryKey: ["trash-komponen-penilaian"],
      });

      return toast.success("Data komponen penilaian berhasil dihapus");
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const mutate = useMutation({
    mutationFn: (id) => deleteKomponenPenilaian(id),
  });

  return { ...mutate };
};
