"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useDeleteTrashProgramStudi = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const deleteTrashProgramStudi = async (id) => {
    try {
      await axios.delete(`/data-referensi/program-studis/trashs/${id}`);

      queryClient.invalidateQueries({
        queryKey: ["trash-program-studi"],
      });
      queryClient.removeQueries({
        queryKey: ["program-studi", id],
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
    mutationFn: (id) => deleteTrashProgramStudi(id),
  });

  return { ...mutate };
};
