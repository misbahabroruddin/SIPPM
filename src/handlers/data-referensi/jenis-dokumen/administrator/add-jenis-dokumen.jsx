"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useCreateJenisDokumen = (onClose, reset) => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const createJenisDokumen = async (form) => {
    const formData = new FormData();
    formData.append("nama", form.nama);
    formData.append("mimes", "pdf");
    formData.append("size", form.size);
    try {
      const response = await axios.post(
        "/data-referensi/jenis-dokumens",
        formData,
      );
      queryClient.invalidateQueries({
        queryKey: ["jenis-dokumen"],
      });
      toast.success(response.data.message);
      onClose();
      reset();
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      } else if (error.response.data.message.nama) {
        toast.error(error.response.data.message.nama[0]);
      } else if (error.response.data.message.mimes) {
        toast.error(error.response.data.message.mimes[0]);
      } else if (error.response.data.message.size) {
        toast.error(error.response.data.message.size[0]);
      } else {
        toast.error(error.response.data.message || "Something went wrong");
      }
    }
  };

  const mutate = useMutation({
    mutationFn: createJenisDokumen,
  });

  return { ...mutate };
};
