"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useDeleteAnggotaProposal = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const handleDelete = async (anggotaId) => {
    try {
      const penelitianId = localStorage.getItem("penelitianId");
      const pengabdianId = localStorage.getItem("pengabdianId");
      const { data } = await axios.delete(
        `/proposal/${penelitianId || pengabdianId || id}/anggotas/delete/${anggotaId}`,
      );
      return data;
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    }
  };

  const { mutateAsync: onDeleteAnggotaDosen, isPending: isLoadingDosen } =
    useMutation({
      mutationFn: handleDelete,
      onSuccess: (data) => {
        if (data) {
          queryClient.invalidateQueries({ queryKey: ["anggotaDosen"] });
          toast.success("Anggota dosen berhasil dihapus");
        }
      },
    });

  const {
    mutateAsync: onDeleteAnggotaMahasiswa,
    isPending: isLoadingMahasiswa,
  } = useMutation({
    mutationFn: handleDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anggotaMahasiswa"] });
      toast.success("Anggota mahasiswa berhasil dihapus");
    },
  });

  return {
    onDeleteAnggotaDosen,
    isLoadingDosen,
    onDeleteAnggotaMahasiswa,
    isLoadingMahasiswa,
  };
};
