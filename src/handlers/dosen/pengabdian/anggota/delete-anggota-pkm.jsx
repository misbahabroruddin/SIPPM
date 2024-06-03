"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useDeleteAnggotaPKM = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const handleDelete = async (anggotaId) => {
    try {
      const pengabdianId = localStorage.getItem("pengabdianId");
      const { data } = await axios.delete(
        `/proposals/dosens/pkms/${pengabdianId || id}/anggotas/${anggotaId}`,
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
          queryClient.invalidateQueries({ queryKey: ["anggotaDosenPKM"] });
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
        queryClient.invalidateQueries({ queryKey: ["anggotaMahasiswaPKM"] });
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
