"use client";

import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

import { useAxios } from "@/lib/hooks/useAxios";

export const useUpdateCatatanReviewer = () => {
  const axios = useAxios();
  const { id } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleUpdateCatatan = async (form) => {
    try {
      const { data } = await axios.put(
        `/laporan-hasils/${id}/catatan`,
        {
          catatan_reviewer: form.catatan,
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

      queryClient.invalidateQueries({
        queryKey: ["listingPenelitianReviewer"],
      });

      queryClient.invalidateQueries({
        queryKey: ["listingPengabdianReviewer"],
      });

      queryClient.invalidateQueries({
        queryKey: ["listLaporanHasilPenelitian"],
      });

      queryClient.invalidateQueries({
        queryKey: ["listLaporanHasilPengabdian"],
      });

      router.push("/penilaian");

      toast.success("Penilaian berhasil");

      return data;
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const mutate = useMutation({
    mutationFn: handleUpdateCatatan,
  });

  return { ...mutate };
};
