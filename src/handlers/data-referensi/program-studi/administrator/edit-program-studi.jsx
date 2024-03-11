"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryEditProgramStudi = (id) => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const editProgramStudi = async (form) => {
    const reqBody = {
      nama: form.nama,
    };

    if (form.keterangan) {
      reqBody.keterangan = form.keterangan;
    }

    try {
      const { data } = await axios.put(
        `/data-referensis/program-studis/${id}`,
        reqBody,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );
      queryClient.invalidateQueries({
        queryKey: ["program-studi"],
      });
      toast.success("Data program studi berhasil diubah");
      return data;
    } catch (error) {
      toast.error(error.message);
    }
  };
  const mutate = useMutation({
    mutationFn: editProgramStudi,
  });

  return { ...mutate };
};
