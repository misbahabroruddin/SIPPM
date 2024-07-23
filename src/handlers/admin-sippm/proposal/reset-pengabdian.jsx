"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useResetPengabdian = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const onResetPengabdian = async (proposalId) => {
    try {
      const { data } = await axios.post(
        `/proposal/pengabdians/reset/${proposalId}`,
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
    mutationFn: onResetPengabdian,
  });

  return { ...mutate };
};
