"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useImportLuaranWajib = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: async (form) => {
      const formData = new FormData();
      formData.append("file_import", form);
      try {
        const { data } = await axios.post(
          "/data-referensi/luaran-wajibs/import",
          formData,
        );
        queryClient.invalidateQueries({ queryKey: ["luaran-wajib"] });
        toast.success("Data luaran wajib berhasil di-import");
        return data;
      } catch (error) {
        if (error.response.status === 401) {
          return signOut();
        }
        toast.error(error.response.data.message || "Something went wrong");
      }
    },
  });

  return { ...mutate };
};
