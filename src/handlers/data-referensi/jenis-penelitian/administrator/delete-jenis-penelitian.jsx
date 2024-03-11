"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useDeleteJenisPenelitian = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const deleteJenisPenelitian = async (id) => {
    try {
      await axios.delete(`/data-referensis/jenis-penelitians/${id}`);
      queryClient.invalidateQueries({
        queryKey: ["jenis-penelitian"],
      });
      queryClient.invalidateQueries({
        queryKey: ["trash-jenis-penelitian"],
      });

      return toast.success("Data jenis penelitian berhasil dihapus");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const mutate = useMutation({
    mutationFn: (id) => deleteJenisPenelitian(id),
  });

  return { ...mutate };
};
