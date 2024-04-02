"use client";

import { convertDate } from "@/lib/utils/convertDate";

export const SectionHeaderDetailProposal = ({ data }) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-lg font-[500] lg:text-xl">{data?.judul}</h1>
      <div className="flex w-full flex-wrap justify-between text-black-07 lg:w-3/4 lg:flex-nowrap">
        <div className="flex w-full justify-between lg:w-2/5">
          <div className="flex grow justify-start gap-2 lg:justify-between lg:gap-4">
            <div className="flex w-[180px] flex-col gap-2 text-sm lg:w-fit lg:text-base">
              <p>Nama Lengkap</p>
              <p>Tempat Tanggal Lahir</p>
              <p>NIDN</p>
              <p>Pangkat/Golongan</p>
              <p>Jabatan Fungsional</p>
              <p>Program Studi</p>
              <p className="block lg:hidden">Email</p>
              <p className="block lg:hidden">Nomor Hp</p>
              <p className="block lg:hidden">ID Sinta</p>
              <p className="block lg:hidden">ID Scopus</p>
              <p className="block lg:hidden">ID Google Scholar</p>
            </div>
            <div className="flex flex-col gap-2 text-sm lg:text-base">
              <div className="flex gap-2 lg:gap-4">
                <span>:</span>
                <p>{data?.user?.biodata ? data?.user?.biodata?.nama : "-"}</p>
              </div>
              <div className="flex gap-2 lg:gap-4">
                <span>:</span>
                <p>
                  {data?.user?.biodata
                    ? `${data?.user?.biodata?.tempat_lahir?.nama || ""}, ${convertDate(data?.user?.biodata?.tanggal_lahir, " ")}`
                    : "-"}
                </p>
              </div>
              <div className="flex gap-2 lg:gap-4">
                <span>:</span>
                <p>{data?.user?.biodata ? data?.user?.biodata?.nidn : "-"}</p>
              </div>
              <div className="flex gap-2 lg:gap-4">
                <span>:</span>
                <p>{data?.user?.biodata?.pangkat_golongan || "-"}</p>
              </div>
              <div className="flex gap-2 lg:gap-4">
                <span>:</span>
                <p>{data?.user?.biodata?.jabatan_fungsional?.nama || "-"}</p>
              </div>
              <div className="flex gap-2 lg:gap-4">
                <span>:</span>
                <p>{data?.user?.biodata?.program_studi?.nama || "-"}</p>
              </div>
              <div className="flex gap-2 lg:hidden lg:gap-4">
                <span>:</span>
                <p>{data?.user?.biodata ? data?.user?.biodata?.email : "-"}</p>
              </div>
              <div className="flex gap-2 lg:hidden lg:gap-4">
                <span>:</span>
                <p>
                  {data?.user?.biodata ? data?.user?.biodata?.nomor_hp : "-"}
                </p>
              </div>
              <div className="flex gap-2 lg:hidden lg:gap-4">
                <span>:</span>
                <p>
                  {data?.user?.biodata ? data?.user?.biodata?.sinta_id : "-"}
                </p>
              </div>
              <div className="flex gap-2 lg:hidden lg:gap-4">
                <span>:</span>
                <p>
                  {data?.user?.biodata ? data?.user?.biodata?.scopus_id : "-"}
                </p>
              </div>
              <div className="flex gap-2 lg:hidden lg:gap-4">
                <span>:</span>
                <p>
                  {data?.user?.biodata
                    ? data?.user?.biodata?.google_scholar_id
                    : "-"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden w-full justify-between lg:flex lg:w-2/5">
          <div className="flex grow justify-start gap-2 lg:justify-between lg:gap-4">
            <div className="flex w-[180px] flex-col gap-2 text-sm lg:w-fit lg:text-base">
              <p>Email</p>
              <p>Nomor Hp</p>
              <p>ID Sinta</p>
              <p>ID Scopus</p>
              <p>ID Google Scholar</p>
            </div>
            <div className="flex flex-col gap-2 text-sm lg:text-base">
              <div className="flex gap-2 lg:gap-4">
                <span>:</span>
                <p>{data?.user?.biodata?.email || "-"}</p>
              </div>
              <div className="flex gap-2 lg:gap-4">
                <span>:</span>
                <p>{data?.user?.biodata?.nomor_hp || "-"}</p>
              </div>
              <div className="flex gap-2 lg:gap-4">
                <span>:</span>
                <p>{data?.user?.biodata?.sinta_id || "-"}</p>
              </div>
              <div className="flex gap-2 lg:gap-4">
                <span>:</span>
                <p>{data?.user?.biodata?.scopus_id || "-"}</p>
              </div>
              <div className="flex gap-2 lg:gap-4">
                <span>:</span>
                <p>{data?.user?.biodata?.google_scholar_id || "-"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
