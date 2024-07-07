"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryEditJabatanFungsional = (id) => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const editJabatanFungsional = async (form) => {
    const reqBody = {
      nama: form.nama,
    };

    if (form.keterangan) {
      reqBody.keterangan = form.keterangan;
    }

    try {
      const { data } = await axios.put(
        `/data-referensi/jabatan-fungsionals/${id}`,
        reqBody,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );
      queryClient.invalidateQueries({
        queryKey: ["jabatan-fungsional"],
      });
      toast.success("Data jabatan fungsional berhasil di ubah");
      return data;
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };
  const mutate = useMutation({
    mutationFn: editJabatanFungsional,
  });

  return { ...mutate };
};
