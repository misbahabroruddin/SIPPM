"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useKirimUsulanPenelitian = () => {
  const axios = useAxios();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const router = useRouter();
  const penelitianId = localStorage.getItem("penelitianId");
  const pathname = usePathname();
  const path = pathname?.split("/");

  const onSubmit = async () => {
    try {
      await axios.post(`/proposal/penelitians/kirim/${penelitianId || id}`);
      queryClient.invalidateQueries({
        queryKey: ["listPenelitian"],
      });
      queryClient.invalidateQueries({
        queryKey: ["listPenelitianDashboardDosen"],
      });
      queryClient.invalidateQueries({
        queryKey: ["listLaporanHasilPenelitian"],
      });
      queryClient.invalidateQueries({
        queryKey: ["listLaporanHasilPengabdian"],
      });
      queryClient.invalidateQueries({
        queryKey: ["trackDosenReviewer"],
      });
      queryClient.invalidateQueries({
        queryKey: ["trackDosenReviewer"],
      });
      queryClient.removeQueries({
        queryKey: ["identitas-usulan-penelitian"],
      });
      queryClient.removeQueries({
        queryKey: ["anggotaMahasiswa"],
      });
      queryClient.removeQueries({
        queryKey: ["anggotaDosen"],
      });
      queryClient.removeQueries({
        queryKey: ["targetCapaian"],
      });
      queryClient.removeQueries({
        queryKey: ["rencanaAnggaran"],
      });
      queryClient.removeQueries({
        queryKey: ["rincianKegiatan"],
      });
      queryClient.removeQueries({
        queryKey: ["detailRencanaAnggaran"],
      });
      queryClient.removeQueries({
        queryKey: ["detailRincianKegiatan"],
      });
      queryClient.removeQueries({
        queryKey: ["dokumenPendukungProposal"],
      });
      toast.success("Proposal penelitian berhasil disubmit");
      router.push(`/${path[1]}`);
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const { mutateAsync: kirimUsulan, isPending: isLoadingSubmit } = useMutation({
    mutationFn: onSubmit,
  });

  return {
    kirimUsulan,
    isLoadingSubmit,
  };
};
