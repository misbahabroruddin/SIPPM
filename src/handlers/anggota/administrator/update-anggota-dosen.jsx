"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";

export const useAdministratorUpdateAnggotaDosen = (id) => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const updateAnggotaDosen = async (form) => {
    try {
      const formData = {
        nik: form.nik,
        nama_lengkap: form.nama_lengkap,
        perguruan_tinggi: form.perguruan_tinggi,
        nidn_or_nidk_or_nim: form.nidn_or_nidk_or_nim,
        jabatan_fungsional_id: form.jabatan_fungsional_id,
        program_studi_id: form.program_studi_id,
        email: form.email,
        nomor_hp: form.nomor_hp,
        sinta_id: form.sinta_id,
        google_scholar_id: form.google_scholar_id,
        jenis_anggota: "Dosen",
      };

      const { data } = await axios.put(`/anggotas/${id}`, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      return data;
    } catch (error) {
      if (error.response?.data.message.nik) {
        return toast.error(error.response.data.message.nik[0]);
      } else if (error.response?.data.message.nidn_or_nidk_or_nim) {
        return toast.error(error.response.data.message.nidn_or_nidk_or_nim[0]);
      } else if (error.response?.data.message.nomor_hp) {
        return toast.error(error.response.data.message.nomor_hp[0]);
      }
      toast.error(error.response.data.message);
    }
  };

  const mutate = useMutation({
    mutationFn: updateAnggotaDosen,
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["anggotaDosenAdministrator"],
      });
    },
  });

  return { ...mutate };
};
