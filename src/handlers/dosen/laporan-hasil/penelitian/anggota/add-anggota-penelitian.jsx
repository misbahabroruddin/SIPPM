"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";

import { useAxios } from "@/lib/hooks/useAxios";

export const useAddAnggotaPenelitianLaporanHasil = (reset, onClose) => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const handleAddNewAnggotaPenelitian = async (anggotaId) => {
    try {
      const formData = new FormData();
      formData.append("anggota_id", anggotaId);
      const { data } = await axios.post(
        `/laporan-hasils/dosens/penelitians/${id}/anggotas`,
        formData,
      );
      toast.success("Anggota berhasil ditambahkan");
      return data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSelectAnggotaPenelitian = async (form) => {
    try {
      const formData = new FormData();
      formData.append("anggota_id", form.anggota_id);
      const { data } = await axios.post(
        `/laporan-hasils/dosens/penelitians/${id}/anggotas`,
        formData,
      );
      reset();
      return data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const {
    mutateAsync: onSubmitAnggotaDosenPenelitian,
    isPending: isLoadingAnggotaDosenPenelitian,
  } = useMutation({
    mutationFn: onSelectAnggotaPenelitian,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anggotaDosenLaporanHasil"] });
      onClose();
      toast.success("Anggota dosen berhasil ditambahkan");
    },
  });

  const {
    mutateAsync: onSubmitAnggotaMahasiswaPenelitian,
    isPending: isLoadingAnggotaMahasiswaPenelitian,
  } = useMutation({
    mutationFn: onSelectAnggotaPenelitian,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["anggotaMahasiswaLaporanHasil"],
      });
      onClose();
      toast.success("Anggota mahasiswa berhasil ditambahkan");
    },
  });

  return {
    handleAddNewAnggotaPenelitian,
    onSubmitAnggotaDosenPenelitian,
    isLoadingAnggotaDosenPenelitian,
    onSubmitAnggotaMahasiswaPenelitian,
    isLoadingAnggotaMahasiswaPenelitian,
  };
};
