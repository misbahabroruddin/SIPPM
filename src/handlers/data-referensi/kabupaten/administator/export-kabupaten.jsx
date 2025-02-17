"use client";

import { useQuery } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
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
        if (error.response.status === 401) {
          return signOut();
        }
        toast.error(error.response.data.message || "Something went wrong");
      }
    },
    enabled: false,
  });

  return { ...query };
};
