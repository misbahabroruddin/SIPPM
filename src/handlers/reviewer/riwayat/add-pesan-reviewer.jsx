"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useCreatePesanReviewer = (riwayatId, reset) => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const onSubmit = async (form) => {
    try {
      const { data } = await axios.post(
        `/proposal/${riwayatId}/chat-reviewers`,
        {
          pesan: form.chat,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
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
        queryKey: ["getRiwayatPesanReviewer", riwayatId],
      });
    },
  });

  return { onSubmitChat, isLoadingSubmit, isError };
};
