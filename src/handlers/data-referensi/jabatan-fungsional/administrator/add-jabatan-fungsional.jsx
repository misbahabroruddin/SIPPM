"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useCreateListingJabatanFungsional = (onClose, reset) => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const createJabatanFungsional = async (form) => {
    const formData = new FormData();
    formData.append("nama", form.nama);
    if (form.keterangan) formData.append("keterangan", form.keterangan);
    try {
      const response = await axios.post(
        "/data-referensi/jabatan-fungsionals",
        formData,
      );
      queryClient.invalidateQueries({
        queryKey: ["jabatan-fungsional"],
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
    mutationFn: createJabatanFungsional,
  });

  return { ...mutate };
};
