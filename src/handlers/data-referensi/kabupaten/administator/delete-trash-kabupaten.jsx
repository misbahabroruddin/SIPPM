"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useDeleteTrashKabupaten = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const deleteTrashKabupaten = async (id) => {
    try {
      await axios.delete(`/data-referensi/kabupatens/trashs/${id}`);

      queryClient.invalidateQueries({
        queryKey: ["trash-kabupaten"],
      });
      queryClient.removeQueries({
        queryKey: ["kabupaten", id],
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
    mutationFn: (id) => deleteTrashKabupaten(id),
  });

  return { ...mutate };
};
