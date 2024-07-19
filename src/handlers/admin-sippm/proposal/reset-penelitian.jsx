"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";
import { useState } from "react";

export const useResetPenelitian = () => {
  const [isLoading, setIsLoading] = useState(false);
  const axios = useAxios();
  const queryClient = useQueryClient();

  const onResetPenelitian = async (proposalId) => {
    try {
      // setIsLoading(true);
      const { data } = await axios.post(
        `/proposal/penelitians/reset/${proposalId}`,
      );

      queryClient.invalidateQueries({
        queryKey: "list-penelitian-admin",
      });
      queryClient.invalidateQueries({
        queryKey: "list-pengabdian-admin",
      });

      toast.success("Proposal Berhasil direset");
      // setIsLoading(false);

      return data;
    } catch (error) {
      if (error.response.status === 401) {
        // setIsLoading(false);

        return signOut();
      }
      // setIsLoading(false);

      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const mutate = useMutation({
    mutationFn: onResetPenelitian,
  });

  return { ...mutate };
};
