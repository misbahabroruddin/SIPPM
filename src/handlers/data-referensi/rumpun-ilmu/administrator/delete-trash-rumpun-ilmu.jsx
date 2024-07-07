"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useDeleteTrashRumpunIlmu = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const deleteTrashRumpunIlmu = async (id) => {
    try {
      await axios.delete(`/data-referensi/rumpun-ilmus/trashs/${id}`);

      queryClient.invalidateQueries({
        queryKey: ["trash-rumpun-ilmu"],
      });
      queryClient.removeQueries({
        queryKey: ["rumpun-ilmu", id],
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
    mutationFn: (id) => deleteTrashRumpunIlmu(id),
  });

  return { ...mutate };
};
