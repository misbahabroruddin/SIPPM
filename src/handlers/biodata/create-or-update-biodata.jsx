"use client";

import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/useAxios";

export const useCreateOrUpdateBiodata = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const onSubmit = async (form) => {
    try {
      const formData = new FormData();
      formData.append("nama_lengkap", form.nama_lengkap);
      formData.append("nik", form.nik);
      formData.append("nidn_or_nidk_or_nim", form.nidn_or_nidk_or_nim);
      const date = new Date(form.tanggal_lahir);
      const formattedDate = date.toISOString().split("T")[0];
      formData.append("tempat_lahir_id", form.tempat_lahir_id);
      console.log(formattedDate);
      formData.append("tanggal_lahir", formattedDate);
      if (form.pangkat_golongan)
        formData.append("pangkat_golongan", form.pangkat_golongan);
      formData.append("jabatan_fungsional_id", form.jabatan_fungsional_id);
      formData.append("program_studi_id", form.program_studi_id);
      if (form.email) formData.append("email", form.email);

      if (form.alamat) formData.append("alamat", form.alamat);
      if (form.nomor_hp) formData.append("nomor_hp", form.nomor_hp);

      if (form.sinta_id) formData.append("sinta_id", form.sinta_id);
      if (form.scopus_id) formData.append("scopus_id", form.scopus_id);
      if (form.google_scholar_id)
        formData.append("google_scholar_id", form.google_scholar_id);

      const { data } = await axios.post("/biodata", formData);

      toast.success(data?.message);

      return data;
    } catch (error) {
      if (error.response?.data.message.nik) {
        return toast.error(error.response?.data.message.nik[0]);
      }
      toast.error(error.message);
    }
  };

  const mutate = useMutation({
    mutationFn: onSubmit,
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["biodata"],
      });
    },
  });

  return { ...mutate };
};
