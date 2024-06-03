"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryEditJenisPenelitian = (id) => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const editJenisPenelitian = async (form) => {
    const reqBody = {
      nama: form.nama,
    };

    if (form.keterangan) {
      reqBody.keterangan = form.keterangan;
    }

    try {
      const { data } = await axios.put(
        `/data-referensis/jenis-penelitians/${id}`,
        reqBody,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );
      queryClient.invalidateQueries({
        queryKey: ["jenis-penelitian"],
      });
      toast.success("Data jenis penelitian berhasil diubah");
      return data;
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };
  const mutate = useMutation({
    mutationFn: editJenisPenelitian,
  });

  return { ...mutate };
};
