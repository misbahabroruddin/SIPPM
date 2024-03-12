"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryEditRumpunIlmu = (id) => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const editRumpunIlmu = async (form) => {
    const reqBody = {
      nama: form.nama,
    };

    if (form.keterangan) {
      reqBody.keterangan = form.keterangan;
    }

    try {
      const { data } = await axios.put(
        `/data-referensis/rumpun-ilmus/${id}`,
        reqBody,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );
      queryClient.invalidateQueries({
        queryKey: ["rumpun-ilmu"],
      });
      toast.success("Data rumpun ilmu berhasil diubah");
      return data;
    } catch (error) {
      toast.error(error.message);
    }
  };
  const mutate = useMutation({
    mutationFn: editRumpunIlmu,
  });

  return { ...mutate };
};
