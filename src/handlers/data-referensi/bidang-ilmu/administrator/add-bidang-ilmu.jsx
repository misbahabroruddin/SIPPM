"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useCreateListingBidangIlmu = (onClose, reset) => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const createBidangIlmu = async (form) => {
    const formData = new FormData();
    formData.append("nama", form.nama);
    if (form.keterangan) formData.append("keterangan", form.keterangan);
    try {
      const response = await axios.post(
        "/data-referensis/bidang-ilmus",
        formData,
      );
      queryClient.invalidateQueries({
        queryKey: ["bidang-ilmu"],
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
    mutationFn: createBidangIlmu,
  });

  return { ...mutate };
};
