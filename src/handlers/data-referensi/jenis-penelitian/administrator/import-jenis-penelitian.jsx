"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useImportJenisPenelitian = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: async (form) => {
      const formData = new FormData();
      formData.append("file_import", form);
      try {
        const { data } = await axios.post(
          "/data-referensis/jenis-penelitians/import",
          formData,
        );
        queryClient.invalidateQueries({ queryKey: ["jenis-penelitian"] });
        toast.success("Data jenis penelitian berhasil di-import");
        return data;
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  return { ...mutate };
};
