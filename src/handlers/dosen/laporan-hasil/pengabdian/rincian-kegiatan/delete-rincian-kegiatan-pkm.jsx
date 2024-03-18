"use client";

import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { useAxios } from "@/lib/hooks/useAxios";

export const useDeleteRincianKegiatanLaporanHasilPKM = (router) => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const handleDelete = async (rincianKegiatanId) => {
    try {
      const { data } = await axios.delete(
        `/laporan-hasils/dosens/pkms/${id}/rincian-kegiatans/${rincianKegiatanId}`,
      );
      queryClient.invalidateQueries({
        queryKey: ["rincianKegiatanLaporanHasilPKM"],
      });
      toast.success("Rincian kegiatan berhasil dihapus");
      router.refresh();
      return data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const { mutateAsync: deleteRincianKegiatan, isPending } = useMutation({
    mutationFn: handleDelete,
  });

  return {
    deleteRincianKegiatan,
    isPending,
  };
};
