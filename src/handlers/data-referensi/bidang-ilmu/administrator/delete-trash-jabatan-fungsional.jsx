"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useDeleteTrashBidangIlmu = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const deleteTrashBidangIlmu = async (id) => {
    try {
      await axios.delete(`/data-referensis/bidang-ilmus/trashs/${id}`);

      queryClient.invalidateQueries({
        queryKey: ["trash-bidang-ilmu"],
      });
      queryClient.removeQueries({
        queryKey: ["bidang-ilmu", id],
      });
      toast.success("Data berhasil dihapus");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const mutate = useMutation({
    mutationFn: (id) => deleteTrashBidangIlmu(id),
  });

  return { ...mutate };
};
