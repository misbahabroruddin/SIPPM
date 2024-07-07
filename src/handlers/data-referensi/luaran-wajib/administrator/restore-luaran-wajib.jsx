"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useRestoreLuaranWajib = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const restoreLuaranWajib = async (id) => {
    try {
      await axios.put(`/data-referensi/luaran-wajibs/trashs/${id}`);

      queryClient.invalidateQueries({
        queryKey: ["luaran-wajib"],
      });
      queryClient.invalidateQueries({
        queryKey: ["trash-luaran-wajib"],
      });
      toast.success("Data luaran wajib berhasil di-restore");
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const mutate = useMutation({
    mutationFn: (id) => restoreLuaranWajib(id),
  });

  return { ...mutate };
};
