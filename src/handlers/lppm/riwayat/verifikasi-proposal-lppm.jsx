"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useVerifikasiProposalLppm = (reset, router) => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const onSubmit = async (form) => {
    try {
      const { data } = await axios.post(
        `/proposal/${id}/verifikasi-lppms`,
        {
          dana_yang_disetujui: form.dana_yang_disetujui,
          status: form.status,
          catatan: form.catatan,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );
      toast.success("Proposal berhasil diupdate");
      reset();
      router.push("/proposal");
      return data;
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const mutate = useMutation({
    mutationFn: onSubmit,
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: ["listPenelitian"] });
      queryClient.resetQueries({ queryKey: ["listPengabdian"] });
      queryClient.invalidateQueries({
        queryKey: ["listingPenelitianLPPM", ""],
      });
      queryClient.invalidateQueries({
        queryKey: ["listingPengabdianLPPM", ""],
      });
      queryClient.invalidateQueries({
        queryKey: ["listPengabdianDashboardLPPM", ""],
      });
      queryClient.invalidateQueries({
        queryKey: ["listPenelitianDashboardLPPM", ""],
      });
      queryClient.invalidateQueries({
        queryKey: ["infoProposalPenelitianLPPMDashboard"],
      });
      queryClient.invalidateQueries({
        queryKey: ["infoProposalPengabdianLPPMDashboard"],
      });
      queryClient.invalidateQueries({
        queryKey: ["infoProposalPengabdianLPPM"],
      });
      queryClient.invalidateQueries({
        queryKey: ["infoProposalPenelitianLPPM"],
      });
      queryClient.invalidateQueries({
        queryKey: ["verfikasiLPPM", id],
      });
      queryClient.resetQueries({ queryKey: ["detailPenelitianLPPM", id] });
      queryClient.resetQueries({ queryKey: ["detailPengabdianLPPM", id] });
    },
  });

  return { ...mutate };
};
