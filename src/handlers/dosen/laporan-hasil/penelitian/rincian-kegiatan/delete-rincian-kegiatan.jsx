"use client";

import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useDeleteRincianKegiatanLaporanHasilPenelitian = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const handleDelete = async (rencanaAnggaranId) => {
    try {
      const { data } = await axios.delete(
        `/laporan-hasils/dosens/penelitians/${id}/rincian-kegiatans/${rencanaAnggaranId}`,
      );
      queryClient.invalidateQueries({
        queryKey: ["rincianKegiatanLaporanHasilPenelitian"],
      });
      toast.success("Rincian Kegiatan berhasil dihapus");
      return data;
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const {
    mutateAsync: deleteRincianKegiatanPenelitian,
    isPending: isLoadingDelete,
  } = useMutation({
    mutationFn: handleDelete,
  });

  return {
    deleteRincianKegiatanPenelitian,
    isLoadingDelete,
  };
};
