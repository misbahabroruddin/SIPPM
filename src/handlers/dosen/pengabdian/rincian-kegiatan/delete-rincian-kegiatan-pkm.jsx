"use client";

import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { useAxios } from "@/lib/hooks/useAxios";

export const useDeleteRincianKegiatanPKM = (router) => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const handleDelete = async (rincianKegiatanId) => {
    try {
      const pengabdianId = localStorage.getItem("pengabdianId");
      const { data } = await axios.delete(
        `/proposals/dosens/pkms/${
          pengabdianId || id
        }/rincian-kegiatans/${rincianKegiatanId}`,
      );
      toast.success("Rincian kegiatan berhasil dihapus");
      router.refresh();
      return data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const { mutateAsync: deleteRincianKegiatan, isPending } = useMutation({
    mutationFn: handleDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rincianKegiatanPKM"] });
    },
  });

  return {
    deleteRincianKegiatan,
    isPending,
  };
};
