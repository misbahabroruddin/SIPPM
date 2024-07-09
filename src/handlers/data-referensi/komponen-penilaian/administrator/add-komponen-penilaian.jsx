"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useCreateKomponenPenilaian = (onClose, reset) => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const createKomponenPenilaian = async (form) => {
    const formData = new FormData();
    formData.append("kriteria_penilaian_id", form.kriteria_penilaian_id);
    formData.append("nama", form.nama);
    try {
      const response = await axios.post(
        "/data-referensi/komponen-penilaians",
        formData,
      );

      queryClient.invalidateQueries({
        queryKey: ["komponen-penilaian"],
      });

      toast.success(response.data.message);
      onClose();
      reset();
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      } else if (error.response.data.message.kriteria_penilaian_id) {
        toast.error(error.response.data.message.kriteria_penilaian_id[0]);
      } else if (error.response.data.message.nama) {
        toast.error(error.response.data.message.nama[0]);
      } else {
        toast.error(error.response.data.message || "Something went wrong");
      }
    }
  };

  const mutate = useMutation({
    mutationFn: createKomponenPenilaian,
  });

  return { ...mutate };
};
