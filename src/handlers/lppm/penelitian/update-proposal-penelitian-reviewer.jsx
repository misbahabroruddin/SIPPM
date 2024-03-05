"use client";

import { useAxios } from "@/lib/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

export const useUpdateProposalPenelitianReviewer = (reset, router) => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const onSubmit = async (form) => {
    try {
      const { data } = await axios.put(
        `/proposals/reviewers/penelitians/${id}`,
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
      toast.error(error.message);
    }
  };

  const mutate = useMutation({
    mutationFn: onSubmit,
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: ["listPenelitian"] });
      queryClient.resetQueries({
        queryKey: ["listingPenelitianLPPM"],
      });
      queryClient.resetQueries({
        queryKey: ["listingPenelitianReviewer"],
      });
      queryClient.resetQueries({ queryKey: ["trackDosenLPPM", id] });
      queryClient.resetQueries({ queryKey: ["trackDosenReviewer", id] });
    },
  });

  return { ...mutate };
};
