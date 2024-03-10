"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useDeleteBidangIlmu = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const deleteBidangIlmu = async (id) => {
    try {
      await axios.delete(`/data-referensis/bidang-ilmus/${id}`);
      queryClient.invalidateQueries({
        queryKey: ["bidang-ilmu"],
      });
      queryClient.invalidateQueries({
        queryKey: ["trash-bidang-ilmu"],
      });

      toast.success("Data bidang ilmu berhasil dihapus");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const mutate = useMutation({
    mutationFn: (id) => deleteBidangIlmu(id),
  });

  return { ...mutate };
};
