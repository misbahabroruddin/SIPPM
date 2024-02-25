"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useKirimUsulanPKM = () => {
  const axios = useAxios();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const pengabdianId = localStorage.getItem("pengabdianId");

  const onSubmit = async () => {
    try {
      await axios.post(
        `/proposals/dosens/pkms/${pengabdianId || id}/kirim-usulan`,
      );
      queryClient.invalidateQueries({
        queryKey: ["listPengabdian"],
      });
      queryClient.resetQueries({
        queryKey: ["anggotaMahasiswa"],
      });
      queryClient.resetQueries({
        queryKey: ["anggotaDosen"],
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const { mutateAsync: kirimUsulan, isPending: isLoadingSubmit } = useMutation({
    mutationFn: onSubmit,
  });

  return {
    kirimUsulan,
    isLoadingSubmit,
  };
};