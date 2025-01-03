"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";
import { useStep } from "@/lib/hooks/useStep";
import { useParams } from "next/navigation";

export const useUploadBerkasLaporanHasilPenelitian = (router) => {
  const axios = useAxios();
  const { setCurrentStep } = useStep();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const onSubmit = async (form) => {
    const formData = new FormData();
    formData.append("file_laporan_hasil", form.file_laporan_hasil[0]);
    if (form.file_pernyataan_mitra) {
      formData.append("file_pernyataan_mitra", form.file_pernyataan_mitra[0]);
    }

    try {
      const { data } = await axios.post(
        `/laporan-hasils/dosens/penelitians/${id}/berkas`,
        formData,
      );
      localStorage.removeItem("penelitianId");
      localStorage.removeItem("step");
      localStorage.removeItem("isEdit");
      router.push("/laporan-hasil");
      setCurrentStep(1);
      toast.success("Laporan Hasil Penelitian berhasil terkirim");
      return data;
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const { mutateAsync: uploadBerkas, isPending: isLoadingSubmit } = useMutation(
    {
      mutationFn: onSubmit,
      onSuccess: (data) => {
        if (data) {
          queryClient.invalidateQueries({
            queryKey: ["listLaporanHasilPenelitian"],
          });
          queryClient.resetQueries({
            queryKey: ["anggotaMahasiswaLaporanHasil"],
          });
          queryClient.resetQueries({
            queryKey: ["anggotaDosenLaporanHasil"],
          });
          queryClient.resetQueries({
            queryKey: ["rencanaAnggaranLaporanHasilPenelitian"],
          });
          queryClient.resetQueries({
            queryKey: ["rincianKegiatanLaporanHasilPenelitian"],
          });
          queryClient.resetQueries({
            queryKey: ["detailRincianKegiatanPenelitian"],
          });
          queryClient.resetQueries({
            queryKey: ["detailRincianKegiatanPKM"],
          });
        }
      },
    },
  );

  return {
    uploadBerkas,
    isLoadingSubmit,
  };
};
