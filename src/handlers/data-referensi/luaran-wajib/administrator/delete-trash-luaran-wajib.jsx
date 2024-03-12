"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useDeleteTrashLuaranWajib = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const deleteTrashLuaranWajib = async (id) => {
    try {
      await axios.delete(`/data-referensis/luaran-wajibs/trashs/${id}`);

      queryClient.invalidateQueries({
        queryKey: ["trash-luaran-wajib"],
      });
      queryClient.removeQueries({
        queryKey: ["luaran-wajib", id],
      });
      toast.success("Data berhasil dihapus");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const mutate = useMutation({
    mutationFn: (id) => deleteTrashLuaranWajib(id),
  });

  return { ...mutate };
};
