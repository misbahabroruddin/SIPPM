"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useDeleteTrashLuaranWajib = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const deleteTrashLuaranWajib = async (id) => {
    try {
      await axios.delete(`/data-referensis/luaran-wajibs/trashs/${id}`);

      queryClient.invalidateQueries({
        queryKey: ["trash-luaran-wajib"],
      });
      queryClient.removeQueries({
        queryKey: ["luaran-wajib", id],
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
    mutationFn: (id) => deleteTrashLuaranWajib(id),
  });

  return { ...mutate };
};
