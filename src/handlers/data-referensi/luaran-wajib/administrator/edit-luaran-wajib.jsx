"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryEditLuaranWajib = (id) => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const editLuaranWajib = async (form) => {
    const reqBody = {
      nama: form.nama,
    };

    if (form.keterangan) {
      reqBody.keterangan = form.keterangan;
    }

    try {
      const { data } = await axios.put(
        `/data-referensis/luaran-wajibs/${id}`,
        reqBody,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );
      queryClient.invalidateQueries({
        queryKey: ["luaran-wajib"],
      });
      toast.success("Data luaran wajib berhasil diubah");
      return data;
    } catch (error) {
      toast.error(error.message);
    }
  };
  const mutate = useMutation({
    mutationFn: editLuaranWajib,
  });

  return { ...mutate };
};
