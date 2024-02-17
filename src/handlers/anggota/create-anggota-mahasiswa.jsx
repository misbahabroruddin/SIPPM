"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAxios } from "@/lib/hooks/useAxios";
import { useAddAnggotaPKM } from "../pengabdian/anggota/add-anggota-pkm";

export const useCreateAnggotaMahasiswa = (reset, onClose) => {
  const queryClient = useQueryClient();
  const axios = useAxios();
  const { handleAddNewAnggota } = useAddAnggotaPKM();

  const onSubmit = async (form) => {
    try {
      const formData = new FormData();
      formData.append("nik", form.nik);
      formData.append("nama_lengkap", form.nama_lengkap);
      formData.append("perguruan_tinggi", form.perguruan_tinggi);
      formData.append("nidn_or_nidk_nim", form.nidn_or_nidk_nim);
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
      }
      toast.error(error.message);
    }
  };

  const { mutateAsync: onCreateAnggotaMahasiswa, isPending } = useMutation({
    mutationFn: onSubmit,
    onSuccess: async (data) => {
      await handleAddNewAnggota(data.data?.id);
      queryClient.invalidateQueries({
        queryKey: ["listMahasiswa"],
      });
      queryClient.invalidateQueries({
        queryKey: ["anggotaMahasiswaPKM"],
      });
      onClose();
    },
  });

  return {
    onCreateAnggotaMahasiswa,
    isPending,
  };
};
