"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useDeleteTrashKomponenPenilaian = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const deleteTrashKomponenPenilaian = async (id) => {
    try {
      await axios.delete(`/data-referensi/komponen-penilaians/trashs/${id}`);

      queryClient.invalidateQueries({
        queryKey: ["trash-komponen-penilaian"],
      });

      queryClient.removeQueries({
        queryKey: ["komponen-penilaian", id],
      });

      toast.success("Data berhasil dihapus");
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const mutate = useMutation({
    mutationFn: (id) => deleteTrashKomponenPenilaian(id),
  });

  return { ...mutate };
};
