"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryEditRincianBiaya = (id) => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const editRincianBiaya = async (form) => {
    const reqBody = {
      rincian: form.rincian,
      anggaran: form.anggaran,
    };

    try {
      const { data } = await axios.put(
        `/data-referensi/rincian-biayas/${id}`,
        reqBody,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );
      queryClient.invalidateQueries({
        queryKey: ["rincian-biaya"],
      });
      toast.success("Data rincian biaya berhasil diubah");
      return data;
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      } else if (error.response.data.message.rincian) {
        toast.error("Rincian biaya sudah ada sebelumnya");
      } else if (error.response.data.message.anggaran) {
        toast.error("Rincian biaya harus berupa angka");
      } else {
        toast.error(error.response.data.message || "Something went wrong");
      }
    }
  };
  const mutate = useMutation({
    mutationFn: editRincianBiaya,
  });

  return { ...mutate };
};
