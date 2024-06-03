"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useDeleteTrashJabatanFungsional = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const deleteTrashJabatanFungsional = async (id) => {
    try {
      await axios.delete(`/data-referensis/jabatan-fungsionals/trashs/${id}`);

      queryClient.invalidateQueries({
        queryKey: ["trash-jabatan-fungsional"],
      });
      queryClient.removeQueries({
        queryKey: ["jabatan-fungsional", id],
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
    mutationFn: (id) => deleteTrashJabatanFungsional(id),
  });

  return { ...mutate };
};
