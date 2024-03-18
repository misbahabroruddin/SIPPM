"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useCreateListingKabupaten = (onClose, reset) => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const createKabupaten = async (form) => {
    const formData = new FormData();
    formData.append("kode", form.kode);
    formData.append("nama", form.nama);
    if (form.provinsi_id) formData.append("provinsi_id", form.provinsi_id);
    try {
      const response = await axios.post(
        "/data-referensis/kabupatens",
        formData,
      );
      queryClient.invalidateQueries({
        queryKey: ["kabupaten"],
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
    mutationFn: createKabupaten,
  });

  return { ...mutate };
};
