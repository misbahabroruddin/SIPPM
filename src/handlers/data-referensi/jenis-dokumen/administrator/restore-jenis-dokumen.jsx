"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useRestoreJenisDokumen = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const restoreJenisDokumen = async (id) => {
    try {
      await axios.put(`/data-referensi/jenis-dokumens/trashs/${id}`);

      queryClient.invalidateQueries({
        queryKey: ["jenis-dokumen"],
      });
      queryClient.invalidateQueries({
        queryKey: ["trash-jenis-dokumen"],
      });
      toast.success("Data jenis dokumen berhasil direstore");
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const mutate = useMutation({
    mutationFn: (id) => restoreJenisDokumen(id),
  });

  return { ...mutate };
};
