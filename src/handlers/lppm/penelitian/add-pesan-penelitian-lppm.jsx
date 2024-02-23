"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useCreatePesanPenelitianLPPM = (riwayatId, reset) => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const onSubmit = async (form) => {
    try {
      const formData = new FormData();
      formData.append("chat", form.chat);
      const { data } = await axios.post(
        `lppms/penelitians/riwayats/${riwayatId}/chats`,
        formData
      );
      reset();
      return data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const {
    mutateAsync: onSubmitChat,
    isPending: isLoadingSubmit,
    isError,
  } = useMutation({
    mutationFn: onSubmit,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getRiwayatPesanPenelitian", riwayatId],
      });
    },
  });

  return { onSubmitChat, isLoadingSubmit, isError };
};
