"use client";

import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useDeleteRincianKegiatanPKM = () => {
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
    onSuccess: (data) => {
      if (data)
        queryClient.invalidateQueries({ queryKey: ["rincianKegiatanPKM"] });
    },
  });

  return {
    deleteRincianKegiatan,
    isPending,
  };
};
