"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useDeleteKabupaten = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const deleteKabupaten = async (id) => {
    try {
      await axios.delete(`/data-referensis/kabupatens/${id}`);
      queryClient.invalidateQueries({
        queryKey: ["kabupaten"],
      });
      queryClient.invalidateQueries({
        queryKey: ["trash-kabupaten"],
      });

      toast.success("Data kabupaten berhasil dihapus");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const mutate = useMutation({
    mutationFn: (id) => deleteKabupaten(id),
  });

  return { ...mutate };
};
