"use client";

import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { useAxios } from "@/lib/hooks/useAxios";

export const useDeleteRencanaAnggaranPenelitian = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const handleDelete = async (rencanaAnggaranId) => {
    try {
      const penelitianId = localStorage.getItem("penelitianId");
      const { data } = await axios.delete(
        `/proposals/dosen/penelitians/${
          penelitianId || id
        }/rencana-anggarans/${rencanaAnggaranId}`
      );
      return data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const {
    mutateAsync: deleteRencanaAnggaranPenelitian,
    isPending: isLoadingSubmit,
  } = useMutation({
    mutationFn: handleDelete,
    onSuccess: () => {
      toast.success("Rencana anggaran penelitian berhasil dihapus");
      queryClient.invalidateQueries({
        queryKey: ["rencanaAnggaranPenelitian"],
      });
    },
  });

  return {
    deleteRencanaAnggaranPenelitian,
    isLoadingSubmit,
  };
};
