"use client";

import Image from "next/image";

import { WindowCloseIcon } from "@/components/svgs/window-close";
import { Spinner } from "@material-tailwind/react";
import { useDeleteDokumenPendukungProposal } from "@/handlers/dosen/proposal/dokumen-pendukung/delete-dokumen-pendukung";
import ModalViewerPDF from "@/components/modal-pdf-viewer";

export const ListDokumenPendukungProposalLaporanHasil = ({
  dokumenPendukung,
}) => {
  const {
    mutateAsync: onDeleteDokumenPendukung,
    isPending: isLoadingDokumenPendukung,
  } = useDeleteDokumenPendukungProposal();

  return dokumenPendukung?.data.length ? (
    <div className="rounded-lg bg-sky px-4 py-2">
      <div className="flex flex-col gap-[10px]">
        {dokumenPendukung?.data.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between text-black-07"
          >
            <p>{doc.jenis_dokumen.nama}</p>
            <div className="flex w-[360px] items-center justify-between rounded-lg bg-white p-2">
              <div className="flex gap-1">
                <Image src="/icons/pdf.svg" width={32} height={32} alt="pdf" />
                <div className="flex items-center">
                  <p className="text-sm">{`${doc.jenis_dokumen.nama}.pdf`}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <ModalViewerPDF data={doc?.url} fileName={"View"} />
                <button
                  title="Hapus"
                  onClick={() => onDeleteDokumenPendukung(doc.id)}
                >
                  {isLoadingDokumenPendukung ? (
                    <Spinner />
                  ) : (
                    <WindowCloseIcon />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : null;
};
