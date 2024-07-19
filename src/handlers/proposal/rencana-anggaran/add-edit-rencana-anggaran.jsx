"use client";

import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { useAxios } from "@/lib/hooks/useAxios";

export const useAddEditRencanaAnggaran = (anggaranId, reset, onClose) => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const onSubmit = async (form) => {
    try {
      const penelitianId = localStorage.getItem("penelitianId");
      const pengabdianId = localStorage.getItem("pengabdianId");

      const formData = new FormData();
      formData.append("rincian_biaya_id", form.rincian_biaya_id);
      formData.append("biaya", form.biaya);

      if (anggaranId) {
        const { data } = await axios.put(
          `/proposal/${
            penelitianId || pengabdianId || id
          }/rencana-anggarans/update/${anggaranId}`,
          {
            rincian_biaya_id: form.rincian_biaya_id,
            biaya: form.biaya,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          },
        );

        toast.success("Rencana anggaran berhasil diubah");

        queryClient.invalidateQueries({
          queryKey: ["rencanaAnggaran"],
        });

        queryClient.invalidateQueries({
          queryKey: ["detailRencanaAnggaran", anggaranId],
        });

        return data;
      } else {
        const { data } = await axios.post(
          `/proposal/${penelitianId || pengabdianId || id}/rencana-anggarans`,
          formData,
        );

        reset();

        toast.success("Rencana anggaran berhasil ditambahkan");

        queryClient.invalidateQueries({
          queryKey: ["rencanaAnggaran"],
        });

        return data;
      }
    } catch (error) {
      if (error.response.data.message.rincian_biaya_id) {
        toast.error(error.response.data.message.rincian_biaya_id[0]);
      } else if (error.response.data.message.biaya) {
        toast.error(error.response.data.message.biaya[0]);
      } else {
        toast.error(error.response.data.message || "Something went wrong");
      }
    }
  };

  const mutate = useMutation({
    mutationFn: onSubmit,
    onSuccess: (data) => {
      if (data) {
        onClose();
      }
    },
  });

  return {
    ...mutate,
  };
};
