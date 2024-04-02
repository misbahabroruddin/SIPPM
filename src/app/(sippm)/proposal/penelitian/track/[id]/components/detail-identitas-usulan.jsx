"use client";

export const DetailIdentitasUsulan = ({ data }) => {
  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-lg font-[500]">Identitas Usulan</h4>
      <div className="flex flex-wrap justify-between gap-2 text-black-07 lg:gap-0">
        <div className="flex w-full gap-1 text-xs md:text-sm lg:w-2/5 lg:text-base">
          <div className="flex flex-col gap-4">
            <p className="min-w-[160px] font-[500] md:min-w-[182px] lg:min-w-[280px]">
              Jenis Penelitian
            </p>
            <p className="min-w-[160px] font-[500] md:min-w-[182px] lg:min-w-[280px]">
              Rumpun Ilmu
            </p>
            <p className="min-w-[160px] font-[500] md:min-w-[182px] lg:min-w-[280px]">
              Bidang Fokus Penelitian
            </p>
            <p className="min-w-[160px] font-[500] md:min-w-[182px] lg:min-w-[280px]">
              Tahun Usulan
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 lg:gap-3">
              <span>:</span>
              <p>{data?.data?.jenis_penelitian?.nama}</p>
            </div>
            <div className="flex gap-2 lg:gap-3">
              <span>:</span>
              <p>{data?.data?.rumpun_ilmu?.nama}</p>
            </div>
            <div className="flex gap-2 lg:gap-3">
              <span>:</span>
              <p>{data?.data?.bidang_fokus}</p>
            </div>
            <div className="flex gap-2 lg:gap-3">
              <span>:</span>
              <p>{data?.data?.tahun_usulan}</p>
            </div>
          </div>
        </div>
        <div className="flex w-full gap-4 text-xs md:text-sm lg:w-1/2 lg:text-base">
          <div className="flex w-fit flex-col gap-4">
            <div className="flex gap-1">
              <p className="min-w-[160px] font-[500] md:min-w-[182px] lg:min-w-[280px]">
                Jangka Waktu Pengabdian
              </p>
              <div className="flex gap-2 lg:gap-3">
                <span>:</span>
                <p className="flex w-[140px] md:w-[200px] lg:w-[450px]">
                  {data?.data?.jangka_waktu}
                </p>
              </div>
            </div>
            <div className="flex gap-1">
              <p className="min-w-[160px] font-[500] md:min-w-[182px] lg:min-w-[280px]">
                Ringkasan Pengabdian
              </p>
              <div className="flex gap-2 lg:gap-3">
                <span>:</span>
                <p className="max-h-[300px] w-[140px] gap-3 overflow-auto px-1 md:w-[200px] lg:w-[450px]">
                  {data?.data?.ringkasan}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
