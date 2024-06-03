"use client";

import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useDeleteRencanaAnggaranLaporanHasilPenelitian = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const handleDelete = async (rencanaAnggaranId) => {
    try {
      const { data } = await axios.delete(
        `/laporan-hasils/dosens/penelitians/${id}/rencana-anggarans/${rencanaAnggaranId}`,
      );
      toast.success("Rencana anggaran penelitian berhasil dihapus");
      queryClient.invalidateQueries({
        queryKey: ["rencanaAnggaranLaporanHasilPenelitian"],
      });
      return data;
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const {
    mutateAsync: deleteRencanaAnggaranPenelitian,
    isPending: isLoadingSubmit,
  } = useMutation({
    mutationFn: handleDelete,
  });

  return {
    deleteRencanaAnggaranPenelitian,
    isLoadingSubmit,
  };
};
