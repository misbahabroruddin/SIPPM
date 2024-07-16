"use client";

import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useDeleteRincianKegiatanProposal = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const handleDelete = async (kegiatanId) => {
    try {
      const penelitianId = localStorage.getItem("penelitianId");
      const pengabdianId = localStorage.getItem("pengabdianId");

      const { data } = await axios.delete(
        `/proposal/${
          penelitianId || pengabdianId || id
        }/rincian-kegiatans/delete/${kegiatanId}`,
      );
      toast.success("Rincian Kegiatan berhasil dihapus");
      return data;
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const mutate = useMutation({
    mutationFn: handleDelete,
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({
          queryKey: ["rincianKegiatan"],
        });
      }
    },
  });

  return {
    ...mutate,
  };
};
