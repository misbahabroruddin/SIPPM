"use client";

import { useParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";
import { useStep } from "@/lib/hooks/useStep";

export const useUploadBerkasLaporanHasilPKM = (router) => {
  const { setCurrentStep } = useStep();
  const axios = useAxios();
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
        `/laporan-hasils/dosens/pkms/${id}/berkas`,
        formData,
      );
      localStorage.removeItem("pengabdianId");
      localStorage.removeItem("step");
      localStorage.removeItem("isEdit");
      router.push("/laporan-hasil");
      toast.success("Laporan Hasil PKM berhasil terkirim");
      return data;
    } catch (error) {
      if (error.response?.data.message.file_laporan_hasil) {
        return toast.error(error.response.data.message.file_laporan_hasil[0]);
      } else if (error.response?.data.message.file_pernyataan_mitra) {
        return toast.error(
          error.response.data.message.file_pernyataan_mitra[0],
        );
      } else {
        toast.error(error.message);
      }
    }
  };

  const { mutateAsync: uploadBerkas, isPending } = useMutation({
    mutationFn: onSubmit,
    onSuccess: () => {
      setCurrentStep(1);
      queryClient.invalidateQueries({
        queryKey: ["listLaporanHasilPengabdian"],
      });
      queryClient.resetQueries({
        queryKey: ["anggotaDosenLaporanHasilPKM"],
      });
      queryClient.resetQueries({
        queryKey: ["anggotaMahasiswaLaporanHasilPKM"],
      });
      queryClient.resetQueries({
        queryKey: ["rencanaAnggaranLaporanHasilPKM"],
      });
      queryClient.resetQueries({
        queryKey: ["rincianKegiatanLaporanHasilPKM"],
      });
      queryClient.resetQueries({
        queryKey: ["detailRincianKegiatanPenelitian"],
      });
      queryClient.resetQueries({
        queryKey: ["detailRincianKegiatanPKM"],
      });
    },
  });

  return {
    uploadBerkas,
    isPending,
  };
};
