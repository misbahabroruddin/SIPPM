"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useDeleteProgramStudi = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const deleteProgramStudi = async (id) => {
    try {
      await axios.delete(`/data-referensi/program-studis/${id}`);
      queryClient.invalidateQueries({
        queryKey: ["program-studi"],
      });
      queryClient.invalidateQueries({
        queryKey: ["trash-program-studi"],
      });

      return toast.success("Data program studi berhasil dihapus");
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const mutate = useMutation({
    mutationFn: (id) => deleteProgramStudi(id),
  });

  return { ...mutate };
};
