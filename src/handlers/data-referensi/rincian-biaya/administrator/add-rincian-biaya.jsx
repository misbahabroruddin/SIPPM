"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useCreateRincianBiaya = (onClose, reset) => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const createRincianBiaya = async (form) => {
    const formData = new FormData();
    formData.append("rincian", form.rincian);
    formData.append("anggaran", form.anggaran);
    try {
      const response = await axios.post(
        "/data-referensi/rincian-biayas",
        formData,
      );
      queryClient.invalidateQueries({
        queryKey: ["rincian-biaya"],
      });
      toast.success(response.data.message);
      onClose();
      reset();
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      } else if (error.response.data.message.rincian) {
        toast.error("Rincian biaya sudah ada sebelumnya");
      } else if (error.response.data.message.anggaran) {
        toast.error("Rincian biaya harus berupa angka");
      } else {
        toast.error(error.response.data.message || "Something went wrong");
      }
    }
  };

  const mutate = useMutation({
    mutationFn: createRincianBiaya,
  });

  return { ...mutate };
};
