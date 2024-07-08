"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useDeleteTrashKriteriaPenilaian = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const deleteTrashKriteriaPenilaian = async (id) => {
    try {
      await axios.delete(`/data-referensi/kriteria-penilaians/trashs/${id}`);

      queryClient.invalidateQueries({
        queryKey: ["trash-kriteria-penilaian"],
      });
      queryClient.removeQueries({
        queryKey: ["kriteria-penilaian", id],
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
    mutationFn: (id) => deleteTrashKriteriaPenilaian(id),
  });

  return { ...mutate };
};
