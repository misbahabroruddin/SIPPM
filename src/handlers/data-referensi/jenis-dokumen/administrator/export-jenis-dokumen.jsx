"use client";

import { useQuery } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useExportJenisDokumen = () => {
  const axios = useAxios();

  const query = useQuery({
    queryKey: ["exportJenisDokumen"],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          "/data-referensi/jenis-dokumens/export",
          {
            responseType: "blob",
          },
        );

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