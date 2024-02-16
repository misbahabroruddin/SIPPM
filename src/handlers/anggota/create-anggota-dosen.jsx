"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";
import { useAddAnggotaPKM } from "../pengabdian/anggota/add-anggota-pkm";

export const useCreateAnggotaDosen = (reset, onClose) => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { handleAddNewAnggota } = useAddAnggotaPKM();

  const createAnggotaDosen = async (form) => {
    try {
      const formData = new FormData();
      formData.append("nik", form.nik);
      formData.append("nama_lengkap", form.nama_lengkap);
      formData.append("perguruan_tinggi", form.perguruan_tinggi);
      formData.append("nidn_or_nidk_nim", form.nidn_or_nidk_nim);
      formData.append("jabatan_fungsional_id", form.jabatan_fungsional_id);
      formData.append("program_studi_id", form.program_studi_id);
      formData.append("email", form.email);
      formData.append("nomor_hp", form.nomor_hp);
      formData.append("sinta_id", form.sinta_id);
      formData.append("google_scholar_id", form.google_scholar_id);
      formData.append("jenis_anggota", "Dosen");
      const { data } = await axios.post(`/anggotas`, formData);
      reset();
      return data;
    } catch (error) {
      if (error.response?.data.message.nik) {
        return toast.error(error.response.data.message.nik[0]);
      }
      toast.error(error.message);
    }
  };

  const { mutateAsync: onCreateAnggotaDosen, isPending } = useMutation({
    mutationFn: createAnggotaDosen,
    onSuccess: async (data) => {
      await handleAddNewAnggota(data.data?.id);
      queryClient.invalidateQueries({
        queryKey: ["anggotaDosenPKM"],
      });
      queryClient.invalidateQueries({
        queryKey: ["listDosen"],
      });
      onClose();
    },
  });

  return {
    onCreateAnggotaDosen,
    isPending,
  };
};
