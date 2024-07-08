"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useDeleteJenisDokumen = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const deleteJenisDokumen = async (id) => {
    try {
      await axios.delete(`/data-referensi/jenis-dokumens/${id}`);
      queryClient.invalidateQueries({
        queryKey: ["jenis-dokumen"],
      });
      queryClient.invalidateQueries({
        queryKey: ["trash-jenis-dokumen"],
      });

      return toast.success("Data jenis dokumen berhasil dihapus");
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const mutate = useMutation({
    mutationFn: (id) => deleteJenisDokumen(id),
  });

  return { ...mutate };
};
