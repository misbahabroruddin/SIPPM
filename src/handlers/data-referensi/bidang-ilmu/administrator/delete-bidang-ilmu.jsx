"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useDeleteBidangIlmu = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const deleteBidangIlmu = async (id) => {
    try {
      await axios.delete(`/data-referensi/bidang-ilmus/${id}`);
      queryClient.invalidateQueries({
        queryKey: ["bidang-ilmu"],
      });
      queryClient.invalidateQueries({
        queryKey: ["trash-bidang-ilmu"],
      });

      toast.success("Data bidang ilmu berhasil dihapus");
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const mutate = useMutation({
    mutationFn: (id) => deleteBidangIlmu(id),
  });

  return { ...mutate };
};
