"use client";

import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

export const useGetProfile = (setValue) => {
  const axios = useAxios();

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get("/biodata");
      if (setValue) {
        setValue("nama_lengkap", data?.data?.nama_lengkap);
        setValue("nik", data?.data?.nik);
        setValue("nidn_or_nidk_or_nim", data?.data?.nidn_or_nidk_or_nim);
        setValue("tempat_lahir_id", data?.data?.tempat_lahir_id);
        if (data?.data?.tanggal_lahir)
          setValue("tanggal_lahir", new Date(data?.data?.tanggal_lahir));
        setValue("pangkat_golongan", data?.data?.pangkat_golongan);
        setValue("jabatan_fungsional_id", data?.data?.jabatan_fungsional_id, {
          shouldValidate: false,
        });
        setValue("program_studi_id", data?.data?.program_studi_id, {
          shouldValidate: false,
        });
        setValue("email", data?.data?.email);
        setValue("alamat", data?.data?.alamat);
        setValue("nomor_hp", data?.data?.nomor_hp);
        setValue("sinta_id", data?.data?.sinta_id);
        setValue("scopus_id", data?.data?.scopus_id);
        setValue("google_scholar_id", data?.data?.google_scholar_id);
      }

      return data?.data;
    } catch (error) {
      if (error.response.status === 401) {
        return signOut();
      }
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const query = useQuery({
    queryKey: ["biodata"],
    queryFn: fetchProfile,
  });

  return { ...query };
};
