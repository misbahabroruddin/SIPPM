"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useDeleteAnggotaLaporanHasilPKM = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const handleDelete = async (anggotaId) => {
    try {
      const { data } = await axios.delete(
        `/laporan-hasils/dosens/pkms/${id}/anggotas/${anggotaId}`,
      );

      return data;
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const { mutateAsync: onDeleteAnggotaDosenPKM, isPending: isLoadingDosenPKM } =
    useMutation({
      mutationFn: handleDelete,
      onSuccess: (data) => {
        if (data) {
          queryClient.invalidateQueries({
            queryKey: ["anggotaDosenLaporanHasilPKM"],
          });
          toast.success("Anggota dosen berhasil dihapus");
        }
      },
    });

  const {
    mutateAsync: onDeleteAnggotaMahasiswaPKM,
    isPending: isLoadingMahasiswaPKM,
  } = useMutation({
    mutationFn: handleDelete,
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({
          queryKey: ["anggotaMahasiswaLaporanHasilPKM"],
        });
        toast.success("Anggota mahasiswa berhasil dihapus");
      }
    },
  });

  return {
    onDeleteAnggotaDosenPKM,
    isLoadingDosenPKM,
    onDeleteAnggotaMahasiswaPKM,
    isLoadingMahasiswaPKM,
  };
};
