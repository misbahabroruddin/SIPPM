"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";
import { useParams } from "next/navigation";

export const useDeleteDokumenPendukungProposal = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const { id: proposalId } = useParams();

  const penelitianId = localStorage.getItem("penelitianId");
  const pengabdianId = localStorage.getItem("pengabdianId");

  const deleteJenisDokumen = async (id) => {
    try {
      await axios.delete(
        `/proposal/${penelitianId || pengabdianId || proposalId}/dokumen-pendukungs/delete/${id}`,
      );

      queryClient.invalidateQueries({
        queryKey: ["dokumenPendukungProposal"],
      });

      return toast.success("Dokumen pendukung berhasil dihapus");
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const mutate = useMutation({
    mutationFn: (id) => deleteJenisDokumen(id),
  });

  return { ...mutate };
};
