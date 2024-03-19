"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useAdministratorCreateAnggotaMahasiswa = (reset) => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const createAnggotaMahasiswa = async (form) => {
    try {
      const formData = new FormData();
      formData.append("nik", form.nik);
      formData.append("nama_lengkap", form.nama_lengkap);
      formData.append("perguruan_tinggi", form.perguruan_tinggi);
      formData.append("nidn_or_nidk_or_nim", form.nidn_or_nidk_or_nim);
      formData.append("jabatan_fungsional_id", form.jabatan_fungsional_id);
      formData.append("program_studi_id", form.program_studi_id);
      formData.append("email", form.email);
      formData.append("nomor_hp", form.nomor_hp);
      formData.append("sinta_id", form.sinta_id);
      formData.append("google_scholar_id", form.google_scholar_id);
      formData.append("jenis_anggota", "Mahasiswa");
      const { data } = await axios.post(`/anggotas`, formData);
      reset();
      return data;
    } catch (error) {
      if (error.response?.data.message.nik) {
        return toast.error(error.response.data.message.nik[0]);
      } else if (error.response?.data.message.nidn_or_nidk_or_nim) {
        return toast.error(error.response.data.message.nidn_or_nidk_or_nim[0]);
      } else if (error.response?.data.message.nomor_hp) {
        return toast.error(error.response.data.message.nomor_hp[0]);
      }
      toast.error(error.message);
    }
  };

  const mutate = useMutation({
    mutationFn: createAnggotaMahasiswa,
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["anggotaMahasiswaAdministrator"],
      });
    },
  });

  return { ...mutate };
};
