"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";
import { checkIsValueDateArr } from "@/lib/utils/checkIsValueDateArr";

export const useAddEditRincianKegiatanLaporanHasilPKM = (
  setStartDate,
  setEndDate,
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
      formData.append("kegiatan", form.kegiatan);
      formData.append("waktu", form.waktu);

      if (anggaranId) {
        const waktu = checkIsValueDateArr(form.waktu);

        const { data } = await axios.put(
          `/laporan-hasils/dosens/pkms/${id}/rincian-kegiatans/${anggaranId}`,
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
          `/laporan-hasils/dosens/pkms/${id}/rincian-kegiatans`,
          formData,
        );
        toast.success("Rincian kegiatan berhasil ditambah");
        reset();
        return data;
      }
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const { mutateAsync: addEditRincianKegiatan, isPending } = useMutation({
    mutationFn: onSubmit,
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({
          queryKey: ["rincianKegiatanLaporanHasilPKM"],
        });
        queryClient.invalidateQueries({
          queryKey: ["detailRincianKegiatanLaporanHasilPKM", anggaranId],
        });
        reset();
        setStartDate();
        setEndDate(null);
        onClose();
      }
    },
  });

  return {
    addEditRincianKegiatan,
    isPending,
  };
};
