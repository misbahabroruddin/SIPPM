"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useCreatePesanDosenLPPM = (riwayatId, reset) => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const onSubmit = async (form) => {
    try {
      const { data } = await axios.post(
        `/proposals/dosens/chats/${riwayatId}/lppms`,
        {
          chat: form.chat,
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
        queryKey: ["getRiwayatPesanDosenLPPM", riwayatId],
      });
    },
  });

  return { onSubmitChat, isLoadingSubmit, isError };
};
