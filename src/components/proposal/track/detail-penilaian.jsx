"use client";

import { ButtonDownload } from "@/components/button/button-download";
import { FormVerifikasiUsulanReviewer } from "./form-verifikasi-usulan-reviewer";
import { ModalUploadFormPenilaian } from "./modal-upload-form-penilaian";
import { useQueryFormPenilian } from "@/handlers/reviewer/penilaian/get-form-penilaian";
import ModalViewerPDF from "@/components/modal-pdf-viewer";

export const DetailPenilaianReviewer = ({ data }) => {
  const { data: dataForm } = useQueryFormPenilian(data?.data?.id);

  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-lg font-[500]">Penilaian</h4>
      <div className="flex flex-col gap-2">
        <h4>Form Penilaian</h4>
        <div className="flex gap-2 lg:gap-4">
          {!dataForm ? (
            <>
              <ButtonDownload className="rounded bg-sky-05" />
              <ModalUploadFormPenilaian id={data?.data?.id} />
              {dataForm ? (
                <ModalViewerPDF
                  data={dataForm?.form_penilaian}
                  fileName={"Detail"}
                />
              ) : null}
            </>
          ) : (
            <>
              <ModalUploadFormPenilaian id={data?.data?.id} />
              <ModalViewerPDF
                data={dataForm?.form_penilaian}
                fileName={"Detail"}
              />
            </>
          )}
        </div>
      </div>
      {data?.data?.status_reviewer !== "Diterima" && (
        <FormVerifikasiUsulanReviewer />
      )}
    </div>
  );
};
