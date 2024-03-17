"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useDeleteAnggotaLaporanHasilPenelitian = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const handleDelete = async (anggotaId) => {
    try {
      const { data } = await axios.delete(
        `/laporan-hasils/dosens/penelitians/${id}/anggotas/${anggotaId}`,
      );
      return data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const {
    mutateAsync: onDeleteAnggotaDosenPenelitian,
    isPending: isLoadingDosen,
  } = useMutation({
    mutationFn: handleDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anggotaDosenLaporanHasil"] });
      toast.success("Anggota dosen berhasil dihapus");
    },
  });

  const {
    mutateAsync: onDeleteAnggotaMahasiswaPenelitian,
    isPending: isLoadingMahasiswa,
  } = useMutation({
    mutationFn: handleDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["anggotaMahasiswaLaporanHasil"],
      });
      toast.success("Anggota mahasiswa berhasil dihapus");
    },
  });

  return {
    onDeleteAnggotaDosenPenelitian,
    isLoadingDosen,
    onDeleteAnggotaMahasiswaPenelitian,
    isLoadingMahasiswa,
  };
};
