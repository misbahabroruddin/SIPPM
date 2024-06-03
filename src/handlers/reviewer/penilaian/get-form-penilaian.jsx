"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryFormPenilian = (id) => {
  const axios = useAxios();

  const fetchFormPenilaian = async () => {
    try {
      const { data } = await axios.get(`/proposals/reviewers/penilaians/${id}`);

      return data.data;
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const query = useQuery({
    queryKey: ["getFormPenilaianReviewer", id],
    queryFn: fetchFormPenilaian,
    enabled: !!id,
  });

  return {
    ...query,
  };
};
