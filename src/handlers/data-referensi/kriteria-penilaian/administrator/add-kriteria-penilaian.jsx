"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useCreateKriteriaPenilaian = (onClose, reset) => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const createKriteriaPenilaian = async (form) => {
    const formData = new FormData();
    formData.append("nama", form.nama);
    formData.append("bobot", form.bobot);
    try {
      const response = await axios.post(
        "/data-referensi/kriteria-penilaians",
        formData,
      );
      queryClient.invalidateQueries({
        queryKey: ["kriteria-penilaian"],
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
      } else if (error.response.data.message.bobot) {
        toast.error(error.response.data.message.bobot[0]);
      } else {
        toast.error(error.response.data.message || "Something went wrong");
      }
    }
  };

  const mutate = useMutation({
    mutationFn: createKriteriaPenilaian,
  });

  return { ...mutate };
};
