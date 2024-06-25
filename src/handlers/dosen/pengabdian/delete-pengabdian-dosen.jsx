"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";
import { useStep } from "@/lib/hooks/useStep";

export const useDeletePengabdianDosen = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { setCurrentStep } = useStep();

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`/proposals/dosens/pkms/${id}`);
      localStorage.removeItem("pengabdianId");
      localStorage.removeItem("step");
      localStorage.removeItem("isEdit");
      setCurrentStep(1);
      return data;
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      Swal.fire({
        title: "Error",
        text: error.response.data.message || "Something went wrong",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  const { mutateAsync: onDeletePengabdianDosen, isPending: isLoadingDelete } =
    useMutation({
      mutationFn: handleDelete,
      onSuccess: (data) => {
        if (data) {
          Swal.fire({
            title: "Success",
            text: data.message,
            icon: "success",
            confirmButtonText: "Ok",
          });
          queryClient.invalidateQueries({ queryKey: ["listPengabdian"] });
          queryClient.invalidateQueries({
            queryKey: ["listPengabdianDashboardDosen"],
          });
          queryClient.resetQueries({
            queryKey: ["anggotaDosenPKM"],
          });
          queryClient.resetQueries({
            queryKey: ["anggotaMahasiswaPKM"],
          });
          queryClient.resetQueries({
            queryKey: ["rincianKegiatanPKM"],
          });
          queryClient.resetQueries({
            queryKey: ["rencanaAnggaranPKM"],
          });
          queryClient.resetQueries({
            queryKey: ["targetCapaianPKM"],
          });
          queryClient.resetQueries({
            queryKey: ["identitas-usulan-pkm"],
          });
          queryClient.resetQueries({
            queryKey: ["detailRencanaAnggaranPKM"],
          });
          queryClient.resetQueries({
            queryKey: ["detailRincianKegiatanPKM"],
          });
          queryClient.resetQueries({
            queryKey: ["infoProposalPenelitianDosenDashboard"],
          });
          queryClient.resetQueries({
            queryKey: ["infoProposalPengabdianDosenDashboard"],
          });
        }
      },
    });

  return {
    onDeletePengabdianDosen,
    isLoadingDelete,
  };
};
