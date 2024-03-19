"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useDeleteTrashKabupaten = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const deleteTrashKabupaten = async (id) => {
    try {
      await axios.delete(`/data-referensis/kabupatens/trashs/${id}`);

      queryClient.invalidateQueries({
        queryKey: ["trash-kabupaten"],
      });
      queryClient.removeQueries({
        queryKey: ["kabupaten", id],
      });
      toast.success("Data berhasil dihapus");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const mutate = useMutation({
    mutationFn: (id) => deleteTrashKabupaten(id),
  });

  return { ...mutate };
};
