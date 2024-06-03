"use client";

import { useParams } from "next/navigation";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useStep } from "@/lib/hooks/useStep";
import { useKirimUsulanPKM } from "../kirim-usulan/kirim-usulan-pkm";

export const useUploadBerkasPKM = (router) => {
  const { setCurrentStep } = useStep();
  const axios = useAxios();
  const { id } = useParams();
  const { kirimUsulan } = useKirimUsulanPKM();
  const queryClient = useQueryClient();

  const onSubmit = async (form) => {
    const formData = new FormData();
    formData.append("file_cv", form.file_cv[0]);
    formData.append("file_proposal", form.file_proposal[0]);
    if (form.file_pernyataan_mitra) {
      formData.append("file_pernyataan_mitra", form.file_pernyataan_mitra[0]);
    }

    try {
      const pengabdianId = localStorage.getItem("pengabdianId");
      const { data } = await axios.post(
        `/proposals/dosens/pkms/${pengabdianId || id}/berkas`,
        formData,
      );
      await kirimUsulan();
      localStorage.removeItem("pengabdianId");
      localStorage.removeItem("step");
      localStorage.removeItem("isEdit");
      router.push("/proposal");
      toast.success("PKM berhasil diajukan");
      return data;
    } catch (error) {
      if (error.response?.data.message.file_cv) {
        return toast.error(error.response.data.message.file_cv[0]);
      } else if (error.response?.data.message.file_proposal) {
        return toast.error(error.response.data.message.file_proposal[0]);
      } else if (error.response?.data.message.file_pernyataan_mitra) {
        return toast.error(
          error.response.data.message.file_pernyataan_mitra[0],
        );
      } else if (error.response.status === 401) {
        return signOut();
      } else {
        toast.error(error.response.data.message || "Something went wrong");
      }
    }
  };

  const { mutateAsync: uploadBerkas, isPending } = useMutation({
    mutationFn: onSubmit,
    onSuccess: (data) => {
      if (data) {
        setCurrentStep(1);
        queryClient.invalidateQueries({
          queryKey: ["listPengabdian"],
        });
        queryClient.resetQueries({
          queryKey: ["anggotaDosenPKM"],
        });
        queryClient.resetQueries({
          queryKey: ["anggotaMahasiswaPKM"],
        });
        queryClient.resetQueries({
          queryKey: ["rencanaAnggaranPKM"],
        });
        queryClient.resetQueries({
          queryKey: ["rincianKegiatanPKM"],
        });
        queryClient.resetQueries({
          queryKey: ["detailRencanaAnggaranPenelitian"],
        });
        queryClient.resetQueries({
          queryKey: ["detailRencanaAnggaranPKM"],
        });
        queryClient.resetQueries({
          queryKey: ["detailRincianKegiatanPenelitian"],
        });
        queryClient.resetQueries({
          queryKey: ["detailRincianKegiatanPKM"],
        });
      }
    },
  });

  return {
    uploadBerkas,
    isPending,
  };
};
