"use client";

import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { signOut } from "next-auth/react";

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
      if (error.response.status === 401) {
        return signOut();
      }
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
          queryKey: ["rencanaAnggaranLaporanHasilPenelitian"],
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
