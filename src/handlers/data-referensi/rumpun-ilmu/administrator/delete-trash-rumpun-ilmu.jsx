"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useDeleteTrashRumpunIlmu = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const deleteTrashRumpunIlmu = async (id) => {
    try {
      await axios.delete(`/data-referensis/rumpun-ilmus/trashs/${id}`);

      queryClient.invalidateQueries({
        queryKey: ["trash-rumpun-ilmu"],
      });
      queryClient.removeQueries({
        queryKey: ["rumpun-ilmu", id],
      });
      toast.success("Data berhasil dihapus");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const mutate = useMutation({
    mutationFn: (id) => deleteTrashRumpunIlmu(id),
  });

  return { ...mutate };
};
