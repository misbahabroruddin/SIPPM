"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
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
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const mutate = useMutation({
    mutationFn: (id) => deleteTrashBidangIlmu(id),
  });

  return { ...mutate };
};
