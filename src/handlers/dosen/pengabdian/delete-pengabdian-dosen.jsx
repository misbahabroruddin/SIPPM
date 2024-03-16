"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

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
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  const { mutateAsync: onDeletePengabdianDosen, isPending: isLoadingDelete } =
    useMutation({
      mutationFn: handleDelete,
      onSuccess: (data) => {
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
      },
    });

  return {
    onDeletePengabdianDosen,
    isLoadingDelete,
  };
};
