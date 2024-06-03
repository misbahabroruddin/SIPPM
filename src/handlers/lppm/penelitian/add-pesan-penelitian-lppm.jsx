"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useCreatePesanPenelitianLPPM = (riwayatId, reset) => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const onSubmit = async (form) => {
    try {
      const formData = new FormData();
      formData.append("chat", form.chat);
      const { data } = await axios.post(
        `/proposals/chats/${riwayatId}/lppms`,
        formData,
      );
      reset();
      return data;
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
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
