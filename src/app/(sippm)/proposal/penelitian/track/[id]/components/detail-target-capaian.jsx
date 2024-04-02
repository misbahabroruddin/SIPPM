"use client";

export const DetailTargetCapaian = ({ data }) => {
  return (
    <div className="flex flex-col gap-4 text-sm lg:text-base">
      <h4 className="text-lg font-[500]">Luaran dan Target Capaian</h4>
      <div className="flex flex-wrap justify-between text-black-07">
        <div className="flex w-full gap-2 lg:w-2/5 lg:gap-4">
          <div className="flex flex-col gap-4">
            <p className="font-[500]">Luaran Wajib</p>
            <p className="font-[500]">Tahun Capaian</p>
            <p className="block font-[500] lg:hidden">Status Capaian</p>
            <p className="block font-[500] lg:hidden">
              Cluster Jurnal Penerbit
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-3">
              <span>:</span>
              <p>{data?.data?.target_capaian?.luaran_wajib?.nama}</p>
            </div>
            <div className="flex gap-3">
              <span>:</span>
              <p>{data?.data?.target_capaian?.tahun_capaian}</p>
            </div>
            <div className="flex gap-3 lg:hidden">
              <span>:</span>
              <p>
                {data?.data?.target_capaian?.status_capaian === "null"
                  ? ""
                  : data?.data?.target_capaian?.status_capaian}
              </p>
            </div>
            <div className="flex gap-3 lg:hidden">
              <span>:</span>
              <p>{data?.data?.target_capaian?.tahun_capaian}</p>
            </div>
          </div>
        </div>
        <div className="hidden w-full gap-4 lg:flex lg:w-2/5">
          <div className="flex flex-col gap-4">
            <p className="font-[500]">Status Capaian</p>
            <p className="font-[500]">Cluster Jurnal Penerbit</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-3">
              <span>:</span>
              <p>
                {data?.data?.target_capaian?.status_capaian === "null"
                  ? ""
                  : data?.data?.target_capaian?.status_capaian}
              </p>
            </div>
            <div className="flex gap-3">
              <span>:</span>
              <p>{data?.data?.target_capaian?.tahun_capaian}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
