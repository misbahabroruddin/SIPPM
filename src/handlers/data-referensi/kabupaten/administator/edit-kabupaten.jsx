"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryEditKabupaten = (id) => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const editKabupaten = async (form) => {
    const reqBody = {
      kode: form.kode,
      nama: form.nama,
    };

    if (form.provinsi_id) {
      reqBody.provinsi_id = form.provinsi_id;
    }

    try {
      const { data } = await axios.put(
        `/data-referensi/kabupatens/${id}`,
        reqBody,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );
      queryClient.invalidateQueries({
        queryKey: ["kabupaten"],
      });
      toast.success("Data kabupaten berhasil diubah");
      return data;
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };
  const mutate = useMutation({
    mutationFn: editKabupaten,
  });

  return { ...mutate };
};
