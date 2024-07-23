"use client";

import { useEffect } from "react";

import { TextArea } from "@/components/input/text-area";
import { useQueryCatatanReviewer } from "@/handlers/reviewer/laporan-hasil/query-get-catatan";
import { useQueryLaporanHasilReviewer } from "@/handlers/reviewer/laporan-hasil/query-get-laporan-hasil";

export const PenilaianDosen = () => {
  const { data: dataLaporanHasil, refetch: refetchLaporanHasil } =
    useQueryLaporanHasilReviewer();

  const { data: dataCatatanReviewer, refetch: refetchCatatanReviewer } =
    useQueryCatatanReviewer();

  useEffect(() => {
    refetchLaporanHasil();
    refetchCatatanReviewer();
  }, []);

  return (
    <div className="flex flex-col gap-2 overflow-hidden rounded-lg">
      <div className="text-sm font-normal ">
        <div className="flex bg-primary py-3 font-[500] text-white">
          <p className="basis-28 text-center">No</p>
          <p className="grow text-center">Penilaian</p>
          <p className="basis-32 text-center">Bobot &#40;%&#41;</p>
          <p className="basis-40 text-center">Skor *&#41;</p>
          <p className="basis-40 text-center">Nilai</p>
        </div>
        <div className="flex flex-col">
          {dataLaporanHasil?.data?.length ? (
            <>
              {dataLaporanHasil?.data.map((item, index) => (
                <div
                  className="flex items-center py-2 even:bg-blue-09"
                  key={item.id}
                >
                  <p className="basis-28 text-center">{index + 1}</p>
                  <div className="flex grow flex-col py-2">
                    <p>{item.kriteria_penilaian.nama}</p>
                    <ul
                      className="ml-4"
                      style={{ listStyleType: "lower-alpha" }}
                    >
                      {item.kriteria_penilaian.komponen_penilaians?.map(
                        (komponen) => (
                          <li key={komponen.id}>{komponen.nama}</li>
                        ),
                      )}
                    </ul>
                  </div>
                  <div className="flex basis-32 justify-center">
                    <p>{item.bobot}</p>
                  </div>
                  <div className="flex basis-40 flex-col justify-center">
                    <input
                      type="number"
                      className="mx-auto w-28 rounded-lg bg-transparent px-2 py-1 text-center"
                      placeholder="Skor"
                      min={1}
                      max={7}
                      value={parseInt(item?.skor)}
                      tabIndex={1}
                      disabled
                    />
                  </div>
                  <div className="flex basis-40 justify-center">
                    <input
                      type="number"
                      className="mx-auto w-28 cursor-default rounded-lg bg-transparent px-2 py-1 text-center focus:outline-none focus:ring-0"
                      placeholder="Nilai"
                      readOnly
                      value={item.nilai ? parseInt(item.nilai) : ""}
                    />
                  </div>
                </div>
              ))}
            </>
          ) : null}

          <div className="flex items-center py-2">
            <div className="basis-28"></div>
            <div className="flex grow flex-col py-2">
              <p>JUMLAH</p>
            </div>
            <div className="flex basis-32 justify-center">
              <p>
                {dataLaporanHasil?.data.reduce((total, item) => {
                  return total + parseInt(item.bobot);
                }, 0)}
              </p>
            </div>
            <div className="flex basis-40 justify-center"></div>
            <div className="flex basis-40 justify-center">
              <input
                type="number"
                className="mx-auto w-28 cursor-default border-none px-2 py-1 text-center focus:outline-none focus:ring-0"
                readOnly
                value={dataLaporanHasil?.data.reduce((total, item) => {
                  return total + parseInt(item.nilai);
                }, 0)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-09 px-6 py-4 text-black-06">
        <p className="mb-2">Catatan Penelaah/Reviewer:</p>
        <TextArea
          placeholder="Masukkan catatan"
          labelClass="hidden"
          textAreaClass="bg-transparent outline-transparent"
          value={dataCatatanReviewer?.data?.catatan_reviewer}
        />
      </div>
    </div>
  );
};
