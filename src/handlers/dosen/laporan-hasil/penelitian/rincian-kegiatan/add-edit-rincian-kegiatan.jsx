"use client";
import { useParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";
import { checkIsValueDateArr } from "@/lib/utils/checkIsValueDateArr";

export const useAddEditRincianKegiatanLaporanHasilPenelitian = (
  anggaranId,
  setStartDate,
  setEndDate,
  reset,
  onClose,
) => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const onSubmit = async (form) => {
    try {
      const formData = new FormData();
      formData.append("kegiatan", form.kegiatan);
      formData.append("waktu", form.waktu);
      if (anggaranId) {
        const waktu = checkIsValueDateArr(form.waktu);
        const { data } = await axios.put(
          `/laporan-hasils/dosens/penelitians/${id}/rincian-kegiatans/${anggaranId}`,
          {
            kegiatan: form.kegiatan,
            waktu,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          },
        );
        toast.success("Rincian kegiatan berhasil diubah");
        return data;
      } else {
        const { data } = await axios.post(
          `/laporan-hasils/dosens/penelitians/${id}/rincian-kegiatans`,
          formData,
        );
        reset();
        toast.success("Rincian kegiatan berhasil ditambah");
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
    mutateAsync: onSubmitRincianKegiatanPenelitian,
    isPending: isLoadingSubmit,
  } = useMutation({
    mutationFn: onSubmit,
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({
          queryKey: ["rincianKegiatanLaporanHasilPenelitian"],
        });
        setStartDate();
        setEndDate();
        onClose();
      }
    },
  });

  return {
    onSubmitRincianKegiatanPenelitian,
    isLoadingSubmit,
  };
};
