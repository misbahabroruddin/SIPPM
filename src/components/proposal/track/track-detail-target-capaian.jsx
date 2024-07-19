"use client";

export const DetailTargetCapaian = ({ data }) => {
  return (
    <div className="flex flex-col gap-4 text-sm lg:text-base">
      <h4 className="text-base font-[500] lg:text-lg">
        Luaran dan Target Capaian
      </h4>
      <div className="flex flex-wrap justify-between text-black-07">
        <div className="flex w-full gap-2 lg:w-2/5 lg:gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 lg:gap-4">
              <p className="min-w-[150px] font-[500] md:min-w-[182px] lg:min-w-[200px]">
                Luaran Wajib
              </p>
              <div className="flex gap-2 lg:gap-3">
                <span>:</span>
                <p>{data?.data?.luaran_wajib?.nama}</p>
              </div>
            </div>
            <div className="flex gap-2 lg:gap-4">
              <p className="min-w-[150px] font-[500] md:min-w-[182px] lg:min-w-[200px]">
                Tahun Capaian
              </p>
              <div className="flex gap-2 lg:gap-3">
                <span>:</span>
                <p>{data?.data?.tahun_capaian}</p>
              </div>
            </div>
            <div className="flex gap-2 lg:gap-4">
              <p className="block min-w-[150px] font-[500] md:min-w-[182px] lg:hidden lg:min-w-[200px]">
                Status Capaian
              </p>
              <div className="flex gap-3 lg:hidden">
                <span>:</span>
                <p>
                  {data?.data?.status_capaian === "null"
                    ? "-"
                    : data?.data?.status_capaian}
                </p>
              </div>
            </div>
            <div className="flex gap-2 lg:gap-4">
              <p className="block min-w-[150px] font-[500] md:min-w-[182px] lg:hidden lg:min-w-[200px]">
                Cluster Jurnal Penerbit
              </p>
              <div className="flex flex-col gap-4">
                <div className="flex gap-3 lg:hidden">
                  <span>:</span>
                  <p>{data?.data?.nama_jurnal_penerbit}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden w-full gap-4 lg:flex lg:w-2/5">
          <div className="flex flex-col gap-4">
            <p className="min-w-[150px] font-[500] md:min-w-[182px] lg:min-w-[200px]">
              Status Capaian
            </p>
            <p className="min-w-[150px] font-[500] md:min-w-[182px] lg:min-w-[200px]">
              Cluster Jurnal Penerbit
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-3">
              <span>:</span>
              <p>
                {data?.data?.status_capaian === "null"
                  ? "-"
                  : data?.data?.status_capaian}
              </p>
            </div>
            <div className="flex gap-3">
              <span>:</span>
              <p>{data?.data?.nama_jurnal_penerbit}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
