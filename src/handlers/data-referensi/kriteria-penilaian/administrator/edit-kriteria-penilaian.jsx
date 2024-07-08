"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryEditKriteriaPenilaian = (id) => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const editKriteriaPenilaian = async (form) => {
    const reqBody = {
      nama: form.nama,
      bobot: form.bobot,
    };

    try {
      const { data } = await axios.put(
        `/data-referensi/kriteria-penilaians/${id}`,
        reqBody,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );
      queryClient.invalidateQueries({
        queryKey: ["kriteria-penilaian"],
      });
      toast.success("Data kriteria penilaian berhasil diubah");
      return data;
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      } else if (error.response.data.message.nama) {
        toast.error(error.response.data.message.nama[0]);
      } else if (error.response.data.message.bobot) {
        toast.error(error.response.data.message.bobot[0]);
      } else {
        toast.error(error.response.data.message || "Something went wrong");
      }
    }
  };
  const mutate = useMutation({
    mutationFn: editKriteriaPenilaian,
  });

  return { ...mutate };
};
