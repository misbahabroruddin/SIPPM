"use client";

import { useAxios } from "@/lib/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

export const useVerifikasiProposalLppm = (reset, router) => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const onSubmit = async (form) => {
    try {
      const { data } = await axios.post(
        `/proposals/lppms/proposals/${id}/verifikasis`,
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
      toast.error(error.message);
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
      queryClient.resetQueries({ queryKey: ["trackDosenLPPM", id] });
    },
  });

  return { ...mutate };
};