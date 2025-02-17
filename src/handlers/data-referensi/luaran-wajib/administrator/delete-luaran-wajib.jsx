"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useDeleteLuaranWajib = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const deleteLuaranWajib = async (id) => {
    try {
      await axios.delete(`/data-referensis/luaran-wajibs/${id}`);
      queryClient.invalidateQueries({
        queryKey: ["luaran-wajib"],
      });
      queryClient.invalidateQueries({
        queryKey: ["trash-luaran-wajib"],
      });

      return toast.success("Data luaran wajib berhasil dihapus");
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const mutate = useMutation({
    mutationFn: (id) => deleteLuaranWajib(id),
  });

  return { ...mutate };
};
