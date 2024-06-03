"use client";

import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { signOut } from "next-auth/react";

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
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
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
