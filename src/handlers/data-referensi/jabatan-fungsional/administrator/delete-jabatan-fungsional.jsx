"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useDeleteJabatanFungsional = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const deleteJabatanFungsional = async (id) => {
    try {
      await axios.delete(`/data-referensis/jabatan-fungsionals/${id}`);
      queryClient.removeQueries({
        queryKey: ["jabatan-fungsional", id],
      });
      queryClient.resetQueries({
        queryKey: ["jabatan-fungsional"],
      });
      queryClient.invalidateQueries({
        queryKey: ["trash-jabatan-fungsional"],
      });

      toast.success("Data jabatan fungsional berhasil dihapus");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const mutate = useMutation({
    mutationFn: (id) => deleteJabatanFungsional(id),
  });

  return { ...mutate };
};
