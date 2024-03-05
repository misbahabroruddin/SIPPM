"use client";

import { useAxios } from "@/lib/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

export const useUpdateProposalPengabdian = (reset, router) => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const onSubmit = async (form) => {
    try {
      const { data } = await axios.put(
        `/proposals/lppms/pkms/${id}`,
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
      queryClient.resetQueries({ queryKey: ["listPengabdian"] });
      queryClient.resetQueries({
        queryKey: ["listingPengabdianLPPM"],
      });
      queryClient.resetQueries({ queryKey: ["trackDosenLPPM", id] });
      queryClient.resetQueries({ queryKey: ["trackDosenReviewer", id] });
      queryClient.resetQueries({ queryKey: ["totalProposalReviewer"] });
      queryClient.resetQueries({ queryKey: ["totalProposalLPPM"] });
      queryClient.resetQueries({ queryKey: ["totalProposalDosen"] });
    },
  });

  return { ...mutate };
};
