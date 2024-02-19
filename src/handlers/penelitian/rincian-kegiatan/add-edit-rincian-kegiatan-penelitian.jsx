"use client";
import { useParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";
import { checkIsValueDateArr } from "@/lib/utils/checkIsValueDateArr";

export const useAddEditRincianKegiatanPenelitian = (
  anggaranId,
  setStartDate,
  setEndDate,
  reset,
  onClose
) => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const onSubmit = async (form) => {
    try {
      const penelitianId = localStorage.getItem("penelitianId");
      const formData = new FormData();
      formData.append("kegiatan", form.kegiatan);
      formData.append("waktu", form.waktu);
      if (anggaranId) {
        const waktu = checkIsValueDateArr(form.waktu);
        const { data } = await axios.put(
          `/proposals/dosen/penelitians/${
            penelitianId || id
          }/rincian-kegiatans/${anggaranId}`,
          {
            kegiatan: form.kegiatan,
            waktu,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        toast.success("Rincian kegiatan berhasil diubah");
        return data;
      } else {
        const { data } = await axios.post(
          `/proposals/dosen/penelitians/${
            penelitianId || id
          }/rincian-kegiatans`,
          formData
        );
        reset();
        toast.success("Rincian kegiatan berhasil ditambah");
        return data;
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const {
    mutateAsync: onSubmitRincianKegiatanPenelitian,
    isPending: isLoadingSubmit,
  } = useMutation({
    mutationFn: onSubmit,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["rincianKegiatanPenelitian"],
      });
      queryClient.invalidateQueries({
        queryKey: ["detailRincianKegiatanPenelitian", anggaranId],
      });
      setStartDate();
      setEndDate();
      onClose();
    },
  });

  return {
    onSubmitRincianKegiatanPenelitian,
    isLoadingSubmit,
  };
};
