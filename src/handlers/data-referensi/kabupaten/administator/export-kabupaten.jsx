"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useExportKabupaten = () => {
  const axios = useAxios();

  const query = useQuery({
    queryKey: ["exportKabupaten"],
    queryFn: async () => {
      try {
        const { data } = await axios.get("/data-referensis/kabupatens/export", {
          responseType: "blob",
        });

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
