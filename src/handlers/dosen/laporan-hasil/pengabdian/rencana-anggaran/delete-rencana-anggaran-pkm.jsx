"use client";

import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { signOut } from "next-auth/react";

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
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
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
