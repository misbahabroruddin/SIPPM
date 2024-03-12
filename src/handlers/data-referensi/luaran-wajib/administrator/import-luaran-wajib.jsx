"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

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
          "/data-referensis/luaran-wajibs/import",
          formData,
        );
        queryClient.invalidateQueries({ queryKey: ["luaran-wajib"] });
        toast.success("Data luaran wajib berhasil di-import");
        return data;
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  return { ...mutate };
};
