"use client";

export const DetailIdentitasUsulan = ({ data }) => {
  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-lg font-[500]">Identitas Usulan</h4>
      <div className="flex flex-wrap gap-2 text-black-07 lg:gap-4 xl:justify-start 2xl:justify-between 2xl:gap-0">
        <div className="flex w-full gap-1 text-sm lg:w-2/5 lg:text-base">
          <div className="flex flex-col gap-2 lg:gap-4">
            <div className="flex gap-2 lg:gap-4">
              <p className="min-w-[150px] font-[500] md:min-w-[182px] lg:min-w-[200px]">
                Rumpun Ilmu
              </p>
              <div className="flex gap-2 lg:gap-3">
                <span>:</span>
                <p>{data?.data?.rumpun_ilmu?.nama}</p>
              </div>
            </div>
            <div className="flex gap-2 lg:gap-4">
              <p className="min-w-[150px] font-[500] md:min-w-[182px] lg:min-w-[200px]">
                Tahun Usulan
              </p>
              <div className="flex gap-2 lg:gap-3">
                <span>:</span>
                <p>{data?.data?.tahun_usulan}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full gap-2 text-sm lg:w-1/2 lg:gap-4 lg:text-base">
          <div className="flex w-fit flex-col gap-4">
            <div className="flex gap-2">
              <p className="min-w-[150px] font-[500] md:min-w-[182px] lg:min-w-[200px]">
                Jangka Waktu Pengabdian
              </p>
              <div className="flex gap-2 lg:gap-3">
                <span>:</span>
                <p className="flex w-[140px] md:w-[200px] xl:w-[330px] 2xl:w-full 2xl:max-w-[450px]">
                  {data?.data?.jangka_waktu}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <p className="min-w-[150px] font-[500] md:min-w-[182px] lg:min-w-[200px]">
                Ringkasan Pengabdian
              </p>
              <div className="flex gap-2 lg:gap-3">
                <span>:</span>
                <p className="max-h-[300px] w-[140px] gap-3 overflow-auto px-1 sm:w-[300px] md:w-[500px] lg:w-[230px] xl:w-[330px] 2xl:w-full 2xl:max-w-[450px]">
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
