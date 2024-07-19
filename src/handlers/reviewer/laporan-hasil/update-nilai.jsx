"use client";

import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useUpdatePenilaian = () => {
  const [isLoading, setIsLoading] = useState(false);
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const handleUpdateNilai = async (nilaiId, skor) => {
    try {
      setIsLoading(true);
      const { data } = await axios.put(
        `/laporan-hasils/${id}/nilai/${nilaiId}`,
        {
          skor,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      queryClient.invalidateQueries({
        queryKey: ["laporan-hasil-reviewer"],
      });
      setIsLoading(false);
      return data;
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error?.response?.data?.message || "Something went wrong");
      setIsLoading(false);
    }
  };

  const mutate = useMutation({
    mutationFn: (data) => handleUpdateNilai(nilaiId, data),
  });

  return { handleUpdateNilai, isLoading };
};

export const handleUpdateNilai = async (nilaiId, skor) => {
  try {
    const { data } = await fetch(
      `/laporan-hasils/${id}/nilai/${nilaiId}`,
      {
        method: "PUT",
        body: skor,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
      // {
      //   skor,
      // },
      // {
      //   headers: {
      //     "Content-Type": "application/x-www-form-urlencoded",
      //   },
      // },
    );

    // queryClient.invalidateQueries({
    //   queryKey: ["laporan-hasil-reviewer"],
    // });
    return data;
  } catch (error) {
    // if (error.response.status === 401) {
    //   return signOut();
    // }
    toast.error(error?.response?.data?.message || "Something went wrong");
  }
};
