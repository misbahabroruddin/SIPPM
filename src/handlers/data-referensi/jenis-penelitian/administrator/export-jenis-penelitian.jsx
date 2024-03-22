"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useExportJenisPenelitian = () => {
  const axios = useAxios();

  const query = useQuery({
    queryKey: ["exportJenisPenelitian"],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          "/data-referensis/jenis-penelitians/export",
          {
            responseType: "blob",
          },
        );

        const blob = new Blob([data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        return blob;
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },
    enabled: false,
  });

  return { ...query };
};
