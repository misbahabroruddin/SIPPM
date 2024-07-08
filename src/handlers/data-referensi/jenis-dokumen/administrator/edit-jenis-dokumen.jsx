"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryEditJenisDokumen = (id) => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const editJenisDokumen = async (form) => {
    const reqBody = {
      nama: form.nama,
      mimes: "pdf",
      size: form.size,
    };

    try {
      const { data } = await axios.put(
        `/data-referensi/jenis-dokumens/${id}`,
        reqBody,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );
      queryClient.invalidateQueries({
        queryKey: ["jenis-dokumen"],
      });
      toast.success("Data jenis dokumen berhasil diubah");
      return data;
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      } else if (error.response.data.message.nama) {
        toast.error(error.response.data.message.nama[0]);
      } else if (error.response.data.message.mimes) {
        toast.error(error.response.data.message.mimes[0]);
      } else if (error.response.data.message.size) {
        toast.error(error.response.data.message.size[0]);
      } else {
        toast.error(error.response.data.message || "Something went wrong");
      }
    }
  };
  const mutate = useMutation({
    mutationFn: editJenisDokumen,
  });

  return { ...mutate };
};
