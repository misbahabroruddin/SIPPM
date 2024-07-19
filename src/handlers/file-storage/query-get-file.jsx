"use client";

import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryGetFile = () => {
  const axios = useAxios();

  const fetchFile = async (path) => {
    try {
      const { data } = await axios.get(`file-storage/view?path=${path}`, {
        responseType: "blob",
      });

      return data;
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const query = useQuery({
    queryKey: "file-pdf",
    queryFn: () => fetchFile(path),
  });

  return { fetchFile };
};
