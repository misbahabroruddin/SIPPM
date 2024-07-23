"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useResetPenelitian = () => {
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

      return data;
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }

      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const mutate = useMutation({
    mutationFn: onResetPenelitian,
  });

  return { ...mutate };
};
