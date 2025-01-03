"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { useAxios } from "@/lib/hooks/useAxios";
import { toast } from "react-toastify";

export const useKirimUsulanPenelitian = () => {
  const axios = useAxios();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const penelitianId = localStorage.getItem("penelitianId");

  const onSubmit = async () => {
    try {
      await axios.post(
        `/proposals/dosens/penelitians/${penelitianId || id}/kirim-usulan`,
      );
      queryClient.invalidateQueries({
        queryKey: ["listPenelitian"],
      });
      queryClient.invalidateQueries({
        queryKey: ["listPenelitianDashboardDosen"],
      });
      queryClient.resetQueries({
        queryKey: ["anggotaMahasiswa"],
      });
      queryClient.resetQueries({
        queryKey: ["anggotaDosen"],
      });
      queryClient.resetQueries({
        queryKey: ["rencanaAnggaranPenelitian"],
      });
      queryClient.resetQueries({
        queryKey: ["rincianKegiatanPenelitian"],
      });
      queryClient.resetQueries({
        queryKey: ["detailRencanaAnggaranPenelitian"],
      });
      queryClient.resetQueries({
        queryKey: ["detailRencanaAnggaranPKM"],
      });
      queryClient.resetQueries({
        queryKey: ["detailRincianKegiatanPenelitian"],
      });
      queryClient.resetQueries({
        queryKey: ["detailRincianKegiatanPKM"],
      });
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
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
