"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryEditKomponenPenilaian = (id) => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const editKomponenPenilaian = async (form) => {
    const reqBody = {
      kriteria_penilaian_id: form.kriteria_penilaian_id,
      nama: form.nama,
    };

    try {
      const { data } = await axios.put(
        `/data-referensi/komponen-penilaians/${id}`,
        reqBody,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );
      queryClient.invalidateQueries({
        queryKey: ["komponen-penilaian"],
      });
      toast.success("Data komponen penilaian berhasil diubah");
      return data;
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      } else if (error.response.data.message.kriteria_penilaian_id) {
        toast.error(error.response.data.message.kriteria_penilaian_id[0]);
      } else if (error.response.data.message.nama) {
        toast.error(error.response.data.message.nama[0]);
      } else {
        toast.error(error.response.data.message || "Something went wrong");
      }
    }
  };
  const mutate = useMutation({
    mutationFn: editKomponenPenilaian,
  });

  return { ...mutate };
};
