"use client";

import { useQuery } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";

import { useAxios } from "@/lib/hooks/useAxios";

export const useQueryIdentitasUsulanPKM = (setValue) => {
  const axios = useAxios();
  const { id } = useParams();

  const fetchIdentitasUsulan = async () => {
    try {
      const pengabdianId = localStorage.getItem("pengabdianId");
      const { data } = await axios.get(`/proposal/penelitians/${pengabdianId}`);
      setValue("rumpun_ilmu_id", data?.data.rumpun_ilmu.id, {
        shouldValidate: true,
      });
      setValue("judul", data?.data.judul);
      setValue("tahun_usulan", data?.data.tahun_usulan);
      setValue("jangka_waktu", data?.data.jangka_waktu);
      setValue("ringkasan", data?.data.ringkasan);

      return data.data;
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const query = useQuery({
    queryKey: ["identitas-usulan-pkm"],
    queryFn: fetchIdentitasUsulan,
    enabled: false,
  });

  return {
    ...query,
  };
};
