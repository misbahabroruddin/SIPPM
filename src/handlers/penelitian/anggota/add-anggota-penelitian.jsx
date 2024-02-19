"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";

import { useAxios } from "@/lib/hooks/useAxios";

export const useAddAnggotaPenelitian = (reset, onClose) => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const penelitianId = localStorage.getItem("penelitianId");
  const { id } = useParams();

  const handleAddNewAnggotaPenelitian = async (anggotaId) => {
    try {
      const formData = new FormData();
      formData.append("anggota_id", anggotaId);
      const { data } = await axios.post(
        `/proposals/dosen/penelitians/${penelitianId || id}/anggotas`,
        formData
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
        `/proposals/dosen/penelitians/${penelitianId || id}/anggotas`,
        formData
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
      queryClient.invalidateQueries({ queryKey: ["anggotaDosen"] });
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
      queryClient.invalidateQueries({ queryKey: ["anggotaMahasiswa"] });
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
