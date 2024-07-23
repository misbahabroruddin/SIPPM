"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, usePathname } from "next/navigation";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import { useAxios } from "@/lib/hooks/useAxios";

export const useKirimUsulanPKM = () => {
  const axios = useAxios();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const pengabdianId = localStorage.getItem("pengabdianId");
  const router = useRouter();
  const pathname = usePathname();
  const path = pathname?.split("/");
  console.log(path[1], pathname);

  const onSubmit = async () => {
    try {
      await axios.post(`/proposal/pengabdians/kirim/${pengabdianId || id}`);
      queryClient.invalidateQueries({
        queryKey: ["listPengabdian"],
      });
      queryClient.invalidateQueries({
        queryKey: ["listPengabdianDashboardDosen"],
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
      queryClient.resetQueries({
        queryKey: ["anggotaMahasiswa"],
      });
      queryClient.resetQueries({
        queryKey: ["anggotaDosen"],
      });
      queryClient.resetQueries({
        queryKey: ["rencanaAnggaranPenelitian"],
      });
      queryClient.resetQueries({
        queryKey: ["rincianKegiatanPenelitian"],
      });
      queryClient.resetQueries({
        queryKey: ["detailRencanaAnggaranPenelitian"],
      });
      queryClient.resetQueries({
        queryKey: ["detailRencanaAnggaranPKM"],
      });
      queryClient.resetQueries({
        queryKey: ["detailRincianKegiatanPenelitian"],
      });
      queryClient.resetQueries({
        queryKey: ["detailRincianKegiatanPKM"],
      });
      toast.success("Proposal pengabdian berhasil disubmit");
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
