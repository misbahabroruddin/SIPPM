"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useDeleteRumpunIlmu = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const deleteRumpunIlmu = async (id) => {
    try {
      await axios.delete(`/data-referensis/rumpun-ilmus/${id}`);
      queryClient.invalidateQueries({
        queryKey: ["rumpun-ilmu"],
      });
      queryClient.invalidateQueries({
        queryKey: ["trash-rumpun-ilmu"],
      });

      return toast.success("Data rumpun ilmu berhasil dihapus");
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const mutate = useMutation({
    mutationFn: (id) => deleteRumpunIlmu(id),
  });

  return { ...mutate };
};
