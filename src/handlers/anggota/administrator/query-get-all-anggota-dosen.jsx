"use client";
import { useQuery } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryAdministratorAnggotaDosen = (search, page) => {
  const axios = useAxios();
  const params = {
    nama_lengkap: search,
    page: page,
  };

  const query = useQuery({
    queryKey: ["anggotaDosenAdministrator", search, page],
    queryFn: async () => {
      try {
        const { data } = await axios.get("/anggotas?jenis_anggota=Dosen", {
          params,
        });
        return data.data;
      } catch (error) {
        if (error.response.status === 401) {
          return signOut();
        }
        toast.error(error.response.data.message || "Something went wrong");
      }
    },
  });

  return { ...query };
};
