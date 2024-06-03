"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useAddEditRencanaAnggaranLaporanHasilPKM = (
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
          `/laporan-hasils/dosens/pkms/${id}/rencana-anggarans/${anggaranId}`,
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
        toast.success("Rencana anggaran PKM berhasil diubah");
        return data;
      } else {
        const { data } = await axios.post(
          `/laporan-hasils/dosens/pkms/${id}/rencana-anggarans`,
          formData,
        );
        reset();
        toast.success("Rencana anggaran PKM berhasil ditambah");
        return data;
      }
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const { mutateAsync: addEditRencanaAnggaran, isPending } = useMutation({
    mutationFn: onSubmit,
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({
          queryKey: ["rencanaAnggaranLaporanHasilPKM"],
        });
        onClose();
      }
    },
  });

  return {
    addEditRencanaAnggaran,
    isPending,
  };
};
