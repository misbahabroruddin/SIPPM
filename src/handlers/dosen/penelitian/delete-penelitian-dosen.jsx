"use client";

import Swal from "sweetalert2";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";
import { useStep } from "@/lib/hooks/useStep";

export const useDeletePenelitianDosen = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { setCurrentStep } = useStep();

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `/proposals/dosens/penelitians/${id}`,
      );
      localStorage.removeItem("penelitianId");
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
        text: error?.response?.data?.message || "Something went wrong",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  const { mutateAsync: onDeletePenelitianDosen, isPending: isLoadingDelete } =
    useMutation({
      mutationFn: handleDelete,
      onSuccess: (data) => {
        if (data) {
          Swal.fire({
            title: "Success",
            text: data?.message,
            icon: "success",
            confirmButtonText: "Ok",
          });
          queryClient.invalidateQueries({ queryKey: ["listPenelitian"] });
          queryClient.invalidateQueries({
            queryKey: ["listPenelitianDashboardDosen"],
          });
          queryClient.resetQueries({
            queryKey: ["anggotaMahasiswa"],
          });
          queryClient.resetQueries({
            queryKey: ["anggotaDosen"],
          });
          queryClient.resetQueries({
            queryKey: ["rincianKegiatanPenelitian"],
          });
          queryClient.resetQueries({
            queryKey: ["rencanaAnggaranPenelitian"],
          });
          queryClient.resetQueries({
            queryKey: ["targetCapaianPenelitian"],
          });
          queryClient.resetQueries({
            queryKey: ["identitas-usulan-penelitian"],
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
        }
      },
    });

  return {
    onDeletePenelitianDosen,
    isLoadingDelete,
  };
};
