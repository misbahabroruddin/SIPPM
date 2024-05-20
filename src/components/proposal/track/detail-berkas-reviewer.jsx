"use client";

import { DetailListBerkas } from "./detail-list-berkas";

export const DetailBerkasReviewer = ({ data }) => {
  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-lg font-[500]">Berkas</h4>
      <DetailListBerkas data={data} />
    </div>
  );
};
