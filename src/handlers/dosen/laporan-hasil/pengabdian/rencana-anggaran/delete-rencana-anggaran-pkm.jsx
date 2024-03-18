"use client";

import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { useAxios } from "@/lib/hooks/useAxios";

export const useDeleteRencanaAnggaranLaporanHasilPKM = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const handleDelete = async (rencanaAnggaranId) => {
    try {
      const { data } = await axios.delete(
        `/laporan-hasils/dosens/pkms/${id}/rencana-anggarans/${rencanaAnggaranId}`,
      );

      queryClient.invalidateQueries({
        queryKey: ["rencanaAnggaranLaporanHasilPKM"],
      });

      toast.success("Rencana anggaran PKM berhasil dihapus");

      return data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const { mutateAsync: deleteRencanaAnggaranPKM, isPending } = useMutation({
    mutationFn: handleDelete,
  });

  return {
    deleteRencanaAnggaranPKM,
    isPending,
  };
};
