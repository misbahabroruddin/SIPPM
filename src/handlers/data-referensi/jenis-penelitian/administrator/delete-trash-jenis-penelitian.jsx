"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useDeleteTrashJenisPenelitian = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const deleteTrashJenisPenelitian = async (id) => {
    try {
      await axios.delete(`/data-referensis/jenis-penelitians/trashs/${id}`);

      queryClient.invalidateQueries({
        queryKey: ["trash-jenis-penelitian"],
      });
      queryClient.removeQueries({
        queryKey: ["jenis-penelitian", id],
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
    mutationFn: (id) => deleteTrashJenisPenelitian(id),
  });

  return { ...mutate };
};
