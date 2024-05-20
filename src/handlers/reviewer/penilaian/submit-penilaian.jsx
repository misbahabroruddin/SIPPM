"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useSubmitPenilaian = (id) => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const handleUploadFormPenilaian = async (form) => {
    try {
      const formData = new FormData();
      formData.append("form_penilaian", form.form_penilaian[0]);

      const response = await axios.post(
        `/proposals/reviewers/penilaians/${id}`,
        formData,
      );
      queryClient.invalidateQueries({
        queryKey: ["detailPenelitianReviewer", id],
      });
      queryClient.invalidateQueries({ queryKey: ["verfikasiReviewer", id] });
      queryClient.invalidateQueries({
        queryKey: ["detailPenelitianReviewer", id],
      });
      queryClient.invalidateQueries({
        queryKey: ["getFormPenilaianReviewer", id],
      });
      queryClient.invalidateQueries({
        queryKey: ["listingPenelitianReviewer"],
      });
      queryClient.invalidateQueries({
        queryKey: ["listingPengabdianReviewer"],
      });
      queryClient.invalidateQueries({
        queryKey: ["infoProposalPenelitianReviewer"],
      });
      queryClient.invalidateQueries({
        queryKey: ["infoProposalPengabdianReviewer"],
      });
      toast.success("Upload Penilaian Berhasil terkirim");
      return response.data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const mutate = useMutation({
    mutationFn: handleUploadFormPenilaian,
  });

  return { ...mutate };
};
