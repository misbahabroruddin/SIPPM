"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useDeleteJabatanFungsional = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const deleteJabatanFungsional = async (id) => {
    try {
      await axios.delete(`/data-referensis/jabatan-fungsionals/${id}`);
      queryClient.invalidateQueries({
        queryKey: ["jabatan-fungsional"],
      });
      queryClient.invalidateQueries({
        queryKey: ["trash-jabatan-fungsional"],
      });

      return toast.success("Data jabatan fungsional berhasil dihapus");
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const mutate = useMutation({
    mutationFn: (id) => deleteJabatanFungsional(id),
  });

  return { ...mutate };
};
