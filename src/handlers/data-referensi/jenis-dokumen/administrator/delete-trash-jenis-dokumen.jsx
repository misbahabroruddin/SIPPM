"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useDeleteTrashJenisDokumen = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const deleteTrashJenisDokumen = async (id) => {
    try {
      await axios.delete(`/data-referensi/jenis-dokumens/trashs/${id}`);

      queryClient.invalidateQueries({
        queryKey: ["trash-jenis-dokumen"],
      });
      queryClient.removeQueries({
        queryKey: ["jenis-dokumen", id],
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
    mutationFn: (id) => deleteTrashJenisDokumen(id),
  });

  return { ...mutate };
};
