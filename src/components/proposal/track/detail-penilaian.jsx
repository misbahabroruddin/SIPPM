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
              <a
                href="https://drive.google.com/drive/folders/1d8jY-LLLTmcu7VgR5HeDLecY8L-v9YPa?usp=drive_link"
                target="_blank"
                className={
                  "flex items-center gap-1 rounded bg-sky-05 px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-gray-500"
                }
              >
                <svg
                  width="23"
                  height="23"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.25 11.9062C13.25 11.6875 13.0625 11.5312 12.875 11.5312H12.125C11.9062 11.5312 11.75 11.6875 11.75 11.9062V14.5312H10.2188C9.875 14.5312 9.71875 14.9375 9.9375 15.1562L12.1875 17.4062C12.3438 17.5625 12.625 17.5625 12.7812 17.4062L15.0312 15.1562C15.25 14.9375 15.0938 14.5312 14.75 14.5312H13.25V11.9062ZM18.0312 7.5625L15.4062 4.96875C15.125 4.6875 14.75 4.5 14.375 4.5H7.96875C7.15625 4.53125 6.5 5.1875 6.5 6.03125V19.0312C6.5 19.8438 7.15625 20.5 7.96875 20.5H16.9688C17.8125 20.5 18.5 19.8438 18.5 19.0312V8.625C18.5 8.25 18.3125 7.84375 18.0312 7.5625ZM14.4688 6.125L16.875 8.53125H14.4688V6.125ZM17 19.0312H7.96875V6.03125H12.9688V9.28125C12.9688 9.6875 13.3125 10.0312 13.7188 10.0312H17V19.0312Z"
                    fill="white"
                  />
                </svg>
                <p className="text-sm md:text-base">Download</p>
              </a>
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
