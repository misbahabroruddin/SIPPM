"use client";

import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { useAxios } from "@/lib/hooks/useAxios";

export const useUploadDokumenPendukungProposal = (onClose) => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const handleUpload = async (form, index) => {
    try {
      const penelitianId = localStorage.getItem("penelitianId");
      const pengabdianId = localStorage.getItem("pengabdianId");

      const formData = new FormData();

      formData.append("file", form.files[index]);
      formData.append("jenis_dokumen_id", form.jenis_dokumen[index]);

      const { data } = await axios.post(
        `/proposal/${penelitianId || pengabdianId || id}/dokumen-pendukungs`,
        formData,
      );

      queryClient.invalidateQueries({
        queryKey: ["dokumenPendukungProposal"],
      });

      onClose();

      return data;
    } catch (error) {
      if (error.response.data.message.jenis_dokumen_id) {
        return toast.error(
          error.response.data.message.jenis_dokumen_id[0] ||
            "Something went wrong",
        );
      } else {
        toast.error(error.response.data.message || "Something went wrong");
      }
    }
  };

  const onSubmit = async (form) => {
    try {
      Array.from(form.files).map(
        async (_, index) => await handleUpload(form, index),
      );
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const mutate = useMutation({
    mutationFn: onSubmit,
  });

  return {
    ...mutate,
  };
};
