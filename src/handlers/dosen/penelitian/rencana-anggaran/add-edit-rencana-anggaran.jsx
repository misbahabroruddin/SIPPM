"use client";

import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { useAxios } from "@/lib/hooks/useAxios";

export const useAddEditRencanaAnggaranPenelitian = (
  anggaranId,
  reset,
  onClose,
) => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const onSubmit = async (form) => {
    try {
      const penelitianId = localStorage.getItem("penelitianId");
      const formData = new FormData();
      formData.append("rincian", form.rincian);
      formData.append("biaya", form.biaya);
      if (anggaranId) {
        const { data } = await axios.put(
          `/proposals/dosens/penelitians/${
            penelitianId || id
          }/rencana-anggarans/${anggaranId}`,
          {
            rincian: form.rincian,
            biaya: form.biaya,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          },
        );
        toast.success("Rencana anggaran penelitian berhasil diubah");
        return data;
      } else {
        const { data } = await axios.post(
          `/proposals/dosens/penelitians/${
            penelitianId || id
          }/rencana-anggarans`,
          formData,
        );
        reset();
        toast.success("Rencana anggaran penelitian berhasil ditambahkan");
        return data;
      }
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const {
    mutateAsync: onSubmitRencanaAnggaran,
    isPending: isLoadingRencanaAnggaran,
  } = useMutation({
    mutationFn: onSubmit,
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({
          queryKey: ["rencanaAnggaranPenelitian"],
        });
        onClose();
      }
    },
    onError: (error) => {
      toast.error(error.response.data.message || "Something went wrong");
    },
  });

  return {
    onSubmitRencanaAnggaran,
    isLoadingRencanaAnggaran,
  };
};
