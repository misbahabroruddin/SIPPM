"use client";

import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { useAxios } from "@/lib/hooks/useAxios";

export const useDeleteRincianKegiatanPenelitian = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const handleDelete = async (rencanaAnggaranId) => {
    try {
      const penelitianId = localStorage.getItem("penelitianId");
      const { data } = await axios.delete(
        `/proposals/dosen/penelitians/${
          penelitianId || id
        }/rincian-kegiatans/${rencanaAnggaranId}`
      );
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
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["rincianKegiatanPenelitian"],
      });
    },
  });

  return {
    deleteRincianKegiatanPenelitian,
    isLoadingDelete,
  };
};
