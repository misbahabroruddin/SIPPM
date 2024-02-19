"use client";

import Swal from "sweetalert2";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/useAxios";
import { useStep } from "@/lib/hooks/useStep";

export const useDeletePenelitianDosen = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { setCurrentStep } = useStep();

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`/proposals/dosen/penelitians/${id}`);
      localStorage.removeItem("penelitianId");
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

  const { mutateAsync: onDeletePenelitianDosen, isPending: isLoadingDelete } =
    useMutation({
      mutationFn: handleDelete,
      onSuccess: (data) => {
        Swal.fire({
          title: "Success",
          text: data.message,
          icon: "success",
          confirmButtonText: "Ok",
        });
        queryClient.invalidateQueries({ queryKey: ["listPenelitian"] });
        queryClient.resetQueries({
          queryKey: ["anggotaMahasiswa"],
        });
        queryClient.resetQueries({
          queryKey: ["anggotaDosen"],
        });
      },
    });

  return {
    onDeletePenelitianDosen,
    isLoadingDelete,
  };
};
