"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useRestoreProgramStudi = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const restoreProgramStudi = async (id) => {
    try {
      await axios.put(`/data-referensi/program-studis/trashs/${id}`);

      queryClient.invalidateQueries({
        queryKey: ["program-studi"],
      });
      queryClient.invalidateQueries({
        queryKey: ["trash-program-studi"],
      });
      toast.success("Data program studi berhasil direstore");
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const mutate = useMutation({
    mutationFn: (id) => restoreProgramStudi(id),
  });

  return { ...mutate };
};
