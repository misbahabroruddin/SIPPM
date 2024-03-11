"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useDeleteTrashProgramStudi = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const deleteTrashProgramStudi = async (id) => {
    try {
      await axios.delete(`/data-referensis/program-studis/trashs/${id}`);

      queryClient.invalidateQueries({
        queryKey: ["trash-program-studi"],
      });
      queryClient.removeQueries({
        queryKey: ["program-studi", id],
      });
      toast.success("Data berhasil dihapus");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const mutate = useMutation({
    mutationFn: (id) => deleteTrashProgramStudi(id),
  });

  return { ...mutate };
};
