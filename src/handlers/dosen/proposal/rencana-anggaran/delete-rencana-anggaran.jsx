"use client";

import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { useAxios } from "@/lib/hooks/useAxios";

export const useDeleteRencanaAnggaran = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const handleDelete = async (rencanaAnggaranId) => {
    try {
      const penelitianId = localStorage.getItem("penelitianId");
      const pengabdianId = localStorage.getItem("pengabdianId");

      const { data } = await axios.delete(
        `/proposal/${
          penelitianId || pengabdianId || id
        }/rencana-anggarans/delete/${rencanaAnggaranId}`,
      );
      return data;
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const mutate = useMutation({
    mutationFn: handleDelete,
    onSuccess: (data) => {
      if (data) {
        toast.success("Rencana anggaran berhasil dihapus");
        queryClient.invalidateQueries({
          queryKey: ["rencanaAnggaran"],
        });
      }
    },
  });

  return {
    ...mutate,
  };
};
