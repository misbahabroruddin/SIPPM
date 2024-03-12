"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useImportRumpunIlmu = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: async (form) => {
      const formData = new FormData();
      formData.append("file_import", form);
      try {
        const { data } = await axios.post(
          "/data-referensis/rumpun-ilmus/import",
          formData,
        );
        queryClient.invalidateQueries({ queryKey: ["rumpun-ilmu"] });
        toast.success("Data rumpun ilmu berhasil di-import");
        return data;
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  return { ...mutate };
};
