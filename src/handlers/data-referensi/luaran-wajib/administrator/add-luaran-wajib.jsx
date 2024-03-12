"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useCreateLuaranWajib = (onClose, reset) => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const createLuaranWajib = async (form) => {
    const formData = new FormData();
    formData.append("nama", form.nama);
    if (form.keterangan) formData.append("keterangan", form.keterangan);
    try {
      const response = await axios.post(
        "/data-referensis/luaran-wajibs",
        formData,
      );
      queryClient.invalidateQueries({
        queryKey: ["luaran-wajib"],
      });
      toast.success(response.data.message);
      onClose();
      reset();
      return response.data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const mutate = useMutation({
    mutationFn: createLuaranWajib,
  });

  return { ...mutate };
};
