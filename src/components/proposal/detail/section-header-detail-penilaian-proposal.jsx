"use client";

export const SectionHeaderDetailPenilaianProposal = ({ data }) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-lg font-[500] lg:text-xl">
        {data?.judul || "Judul Proposal"}
      </h1>
      <div className="flex w-full flex-wrap justify-between text-primary lg:w-3/4 lg:flex-nowrap">
        <div className="flex w-full justify-between lg:w-2/4">
          <div className="flex w-[180px] flex-col justify-start gap-2 text-sm lg:w-full lg:justify-between lg:text-base">
            <div className="flex gap-2 lg:gap-4">
              <p className="min-w-[120px] lg:min-w-[155px]">Nama Pengusul</p>
              <div className="flex min-w-[200px] gap-2 lg:w-full lg:gap-4">
                <span>:</span>
                <p>
                  {data?.user?.biodata
                    ? data?.user?.biodata?.nama_lengkap
                    : "-"}
                </p>
              </div>
            </div>
            <div className="flex gap-2 lg:gap-4">
              <p className="min-w-[120px] lg:min-w-[155px]">
                Tanggal Penilaian
              </p>
              <div className="flex min-w-[200px] gap-2 lg:w-full lg:gap-4">
                <span>:</span>
                <p>
                  {data?.user?.biodata
                    ? data?.user?.biodata?.nama_lengkap
                    : "-"}
                </p>
              </div>
            </div>
            <div className="flex gap-2 lg:gap-4">
              <p className="min-w-[120px] lg:min-w-[155px]">Jenis</p>
              <div className="flex min-w-[200px] gap-2 lg:w-full lg:gap-4">
                <span>:</span>
                <p>
                  {data?.user?.biodata
                    ? data?.user?.biodata?.nama_lengkap
                    : "-"}
                </p>
              </div>
            </div>
            <div className="flex gap-2 lg:gap-4">
              <p className="min-w-[120px] lg:min-w-[155px]">Bidang</p>
              <div className="flex min-w-[200px] gap-2 lg:w-full lg:gap-4">
                <span>:</span>
                <p>
                  {data?.user?.biodata
                    ? data?.user?.biodata?.nama_lengkap
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
                    ? data?.user?.biodata?.nama_lengkap
                    : "-"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
