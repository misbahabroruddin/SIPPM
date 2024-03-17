"use client";

import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { useAxios } from "@/lib/hooks/useAxios";

export const useAddEditRencanaAnggaranLaporanHasilPenelitian = (
  anggaranId,
  reset,
  onClose,
) => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const onSubmit = async (form) => {
    try {
      const formData = new FormData();
      formData.append("rincian", form.rincian);
      formData.append("biaya", form.biaya);
      if (anggaranId) {
        const { data } = await axios.put(
          `/laporan-hasils/dosens/penelitians/${id}/rencana-anggarans/${anggaranId}`,
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
          `/laporan-hasils/dosens/penelitians/${id}/rencana-anggarans`,
          formData,
        );
        reset();
        toast.success("Rencana anggaran penelitian berhasil ditambahkan");
        return data;
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const {
    mutateAsync: onSubmitRencanaAnggaran,
    isPending: isLoadingRencanaAnggaran,
  } = useMutation({
    mutationFn: onSubmit,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["rencanaAnggaranLaporanHasilPenelitian"],
      });
      onClose();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    onSubmitRencanaAnggaran,
    isLoadingRencanaAnggaran,
  };
};
