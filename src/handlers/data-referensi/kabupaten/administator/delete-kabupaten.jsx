"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useDeleteKabupaten = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const deleteKabupaten = async (id) => {
    try {
      await axios.delete(`/data-referensi/kabupatens/${id}`);
      queryClient.invalidateQueries({
        queryKey: ["kabupaten"],
      });
      queryClient.invalidateQueries({
        queryKey: ["trash-kabupaten"],
      });

      toast.success("Data kabupaten berhasil dihapus");
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const mutate = useMutation({
    mutationFn: (id) => deleteKabupaten(id),
  });

  return { ...mutate };
};
