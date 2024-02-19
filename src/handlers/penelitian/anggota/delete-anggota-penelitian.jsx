"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useDeleteAnggotaPenelitian = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const handleDelete = async (anggotaId) => {
    try {
      const penelitianId = localStorage.getItem("penelitianId");
      const { data } = await axios.delete(
        `/proposals/dosen/penelitians/${
          penelitianId || id
        }/anggotas/${anggotaId}`
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
      queryClient.invalidateQueries({ queryKey: ["anggotaDosen"] });
      toast.success("Anggota dosen berhasil dihapus");
    },
  });

  const {
    mutateAsync: onDeleteAnggotaMahasiswaPenelitian,
    isPending: isLoadingMahasiswa,
  } = useMutation({
    mutationFn: handleDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anggotaMahasiswa"] });
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
