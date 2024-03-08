"use client";

import { useAxios } from "@/lib/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useImportJabatanFungsional = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: async (form) => {
      const formData = new FormData();
      formData.append("file_import", form);
      try {
        const { data } = await axios.post(
          "/data-referensis/jabatan-fungsionals/import",
          formData,
        );
        queryClient.invalidateQueries({ queryKey: ["jabatan-fungsional"] });
        toast.success("Data jabatan fungsional berhasil di import");
        return data;
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  return { ...mutate };
};
