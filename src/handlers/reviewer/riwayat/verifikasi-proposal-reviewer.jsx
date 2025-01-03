"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useVerifikasiProposalReviewer = (reset, router) => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const onSubmit = async (form) => {
    try {
      const { data } = await axios.post(
        `/proposals/reviewers/proposals/${id}/verifikasis`,
        {
          dana_yang_disetujui: 0,
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
        queryKey: ["listingPenelitianReviewer", ""],
      });
      queryClient.invalidateQueries({
        queryKey: ["listingPengabdianReviewer", ""],
      });
      queryClient.invalidateQueries({
        queryKey: ["listPengabdianDashboardReviewer", ""],
      });
      queryClient.invalidateQueries({
        queryKey: ["listPenelitianDashboardReviewer", ""],
      });
      queryClient.invalidateQueries({
        queryKey: ["infoProposalPenelitianReviewerDashboard"],
      });
      queryClient.invalidateQueries({
        queryKey: ["infoProposalPengabdianReviewerDashboard"],
      });
      queryClient.invalidateQueries({
        queryKey: ["infoProposalPenelitianReviewer"],
      });
      queryClient.invalidateQueries({
        queryKey: ["infoProposalPengabdianReviewer"],
      });
      queryClient.invalidateQueries({
        queryKey: ["verfikasiReviewer", id],
      });
      queryClient.invalidateQueries({
        queryKey: ["getFormPenilaianReviewer"],
      });
      queryClient.invalidateQueries({
        queryKey: ["detailPenelitianReviewer", id],
      });
      queryClient.resetQueries({ queryKey: ["trackDosenReviewer", id] });
    },
  });

  return { ...mutate };
};
