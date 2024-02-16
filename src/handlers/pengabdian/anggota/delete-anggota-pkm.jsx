"use client";

import { useAxios } from "@/lib/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useDeleteAnggotaPKM = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const handleDelete = async (anggotaId) => {
    try {
      const pengabdianId = localStorage.getItem("pengabdianId");
      const { data } = await axios.delete(
        `/proposals/dosen/pkms/${pengabdianId}/anggotas/${anggotaId}`
      );

      return data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const { mutateAsync: onDeleteAnggotaDosenPKM, isPending: isLoadingDosenPKM } =
    useMutation({
      mutationFn: handleDelete,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["anggotaDosenPKM"] });
        toast.success("Anggota dosen berhasil dihapus");
      },
    });

  const {
    mutateAsync: onDeleteAnggotaMahasiswaPKM,
    isPending: isLoadingMahasiswaPKM,
  } = useMutation({
    mutationFn: handleDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anggotaMahasiswaPKM"] });
      toast.success("Anggota mahasiswa berhasil dihapus");
    },
  });

  return {
    onDeleteAnggotaDosenPKM,
    isLoadingDosenPKM,
    onDeleteAnggotaMahasiswaPKM,
    isLoadingMahasiswaPKM,
  };
};
