"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useCreateJenisPenelitian = (onClose, reset) => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const createJenisPenelitian = async (form) => {
    const formData = new FormData();
    formData.append("nama", form.nama);
    if (form.keterangan) formData.append("keterangan", form.keterangan);
    try {
      const response = await axios.post(
        "/data-referensi/jenis-penelitians",
        formData,
      );
      queryClient.invalidateQueries({
        queryKey: ["jenis-penelitian"],
      });
      toast.success(response.data.message);
      onClose();
      reset();
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const mutate = useMutation({
    mutationFn: createJenisPenelitian,
  });

  return { ...mutate };
};
