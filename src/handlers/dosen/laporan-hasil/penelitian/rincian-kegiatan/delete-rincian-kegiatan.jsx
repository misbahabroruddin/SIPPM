"use client";

import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";

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
      toast.error(error.message);
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
