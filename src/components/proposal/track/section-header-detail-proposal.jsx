"use client";

import { convertDate } from "@/lib/utils/convertDate";

export const SectionHeaderDetailProposal = ({ data }) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-lg font-[500] lg:text-xl">
        {data?.judul || "Judul Proposal"}
      </h1>
      <div className="flex w-full flex-wrap justify-between text-black-07 lg:w-3/4 lg:flex-nowrap">
        <div className="flex w-full justify-between lg:w-2/4">
          <div className="flex w-[180px] flex-col justify-start gap-2 text-sm lg:w-full lg:justify-between lg:text-base">
            <div className="flex gap-2 lg:gap-4">
              <p className="min-w-[120px] lg:min-w-[155px]">Nama Lengkap</p>
              <div className="flex min-w-[200px] gap-2 lg:w-full lg:gap-4">
                <span>:</span>
                <p>
                  {data?.user?.biodata
                    ? data?.user?.biodata?.nama_lengkap
                    : data?.user?.name}
                </p>
              </div>
            </div>
            <div className="flex gap-2 lg:gap-4">
              <p className="min-w-[120px] lg:min-w-[155px]">
                Tempat Tanggal Lahir
              </p>
              <div className="flex min-w-[200px] gap-2 lg:w-full lg:gap-4">
                <span>:</span>
                <p>
                  {data?.user?.biodata
                    ? `${data?.user?.biodata?.tempat_lahir?.nama || ""}, ${convertDate(data?.user?.biodata?.tanggal_lahir, " ")}`
                    : "-"}
                </p>
              </div>
            </div>
            <div className="flex gap-2 lg:gap-4">
              <p className="min-w-[120px] lg:min-w-[155px]">NIDN</p>
              <div className="flex min-w-[200px] gap-2 lg:w-full lg:gap-4">
                <span>:</span>
                <p>
                  {data?.user?.biodata
                    ? data?.user?.biodata?.nidn_or_nidk_or_nim
                    : "-"}
                </p>
              </div>
            </div>
            <div className="flex gap-2 lg:gap-4">
              <p className="min-w-[120px] lg:min-w-[155px]">Pangkat/Golongan</p>
              <div className="flex min-w-[200px] gap-2 lg:w-full lg:gap-4">
                <span>:</span>
                <p>{data?.user?.biodata?.pangkat_golongan || "-"}</p>
              </div>
            </div>
            <div className="flex gap-2 lg:gap-4">
              <p className="min-w-[120px] lg:min-w-[155px]">
                Jabatan Fungsional
              </p>
              <div className="flex min-w-[200px] gap-2 lg:w-full lg:gap-4">
                <span>:</span>
                <p>{data?.user?.biodata?.jabatan_fungsional?.nama || "-"}</p>
              </div>
            </div>
            <div className="flex gap-2 lg:gap-4">
              <p className="min-w-[120px] lg:min-w-[155px]">Program Studi</p>
              <div className="flex min-w-[200px] gap-2 lg:w-full lg:gap-4">
                <span>:</span>
                <p>{data?.user?.biodata?.program_studi?.nama || "-"}</p>
              </div>
            </div>
            <div className="flex gap-2 lg:hidden">
              <p className="block min-w-[120px] lg:hidden">Email</p>
              <div className="flex min-w-[200px] gap-2 lg:hidden lg:gap-4">
                <span>:</span>
                <p>
                  {data?.user?.biodata
                    ? data?.user?.biodata?.email
                    : data?.user?.email}
                </p>
              </div>
            </div>
            <div className="flex gap-2 lg:hidden">
              <p className="block min-w-[120px] lg:hidden">Nomor Hp</p>
              <div className="flex min-w-[200px] gap-2 lg:hidden lg:gap-4">
                <span>:</span>
                <p>
                  {data?.user?.biodata ? data?.user?.biodata?.nomor_hp : "-"}
                </p>
              </div>
            </div>
            <div className="flex gap-2 lg:hidden">
              <p className="block min-w-[120px]">ID Sinta</p>
              <div className="flex min-w-[200px] gap-2 lg:gap-4">
                <span>:</span>
                <p>{data?.user?.biodata?.sinta_id || "-"}</p>
              </div>
            </div>
            <div className="flex gap-2 lg:hidden">
              <p className="block min-w-[120px]">ID Scopus</p>
              <div className="flex min-w-[200px] gap-2 lg:gap-4">
                <span>:</span>
                <p>{data?.user?.biodata?.scopus_id || "-"}</p>
              </div>
            </div>
            <div className="flex gap-2 lg:hidden">
              <p className="block min-w-[120px]">ID Google Scholar</p>
              <div className="flex min-w-[200px] gap-2 lg:gap-4">
                <span>:</span>
                <p>{data?.user?.biodata?.google_scholar_id || "-"}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden w-full justify-between lg:flex lg:w-2/5">
          <div className="flex grow justify-start gap-2 lg:justify-between lg:gap-4">
            <div className="flex w-[180px] flex-col gap-2 text-sm lg:w-fit lg:text-base">
              <div className="flex gap-2 lg:gap-4">
                <p className="min-w-[120px] lg:min-w-[155px]">Email</p>
                <div className="flex gap-2 lg:gap-4">
                  <span>:</span>
                  <p>
                    {data?.user?.biodata
                      ? data?.user?.biodata?.email
                      : data?.user?.email}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 lg:gap-4">
                <p className="min-w-[120px] lg:min-w-[155px]">Nomor Hp</p>
                <div className="flex gap-2 lg:gap-4">
                  <span>:</span>
                  <p>{data?.user?.biodata?.nomor_hp || "-"}</p>
                </div>
              </div>
              <div className="flex gap-2 lg:gap-4">
                <p className="min-w-[120px] lg:min-w-[155px]">ID Sinta</p>
                <div className="flex gap-2 lg:gap-4">
                  <span>:</span>
                  <p>{data?.user?.biodata?.sinta_id || "-"}</p>
                </div>
              </div>
              <div className="flex gap-2 lg:gap-4">
                <p className="min-w-[120px] lg:min-w-[155px]">ID Scopus</p>
                <div className="flex gap-2 lg:gap-4">
                  <span>:</span>
                  <p>{data?.user?.biodata?.scopus_id || "-"}</p>
                </div>
              </div>
              <div className="flex gap-2 lg:gap-4">
                <p className="min-w-[120px] lg:min-w-[155px]">
                  ID Google Scholar
                </p>
                <div className="flex gap-2 lg:gap-4">
                  <span>:</span>
                  <p>{data?.user?.biodata?.google_scholar_id || "-"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
