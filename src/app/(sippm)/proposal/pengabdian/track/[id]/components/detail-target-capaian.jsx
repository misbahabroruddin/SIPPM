"use client";

export const DetailTargetCapaian = ({ data }) => {
  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-lg font-[500]">Luaran dan Target Capaian</h4>
      <div className="flex justify-between text-black-07">
        <div className="flex w-2/5 justify-between">
          <div className="flex flex-col gap-4">
            <p className="font-[500]">Luaran Wajib</p>
            <p className="font-[500]">Tahun Capaian</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-3">
              <span>:</span>
              <p>{data?.data?.target_capaian_proposal?.luaran_wajib?.nama}</p>
            </div>
            <div className="flex gap-3">
              <span>:</span>
              <p>{data?.data?.target_capaian_proposal?.tahun_capaian}</p>
            </div>
          </div>
        </div>
        <div className="flex w-2/5 justify-between">
          <div className="flex flex-col gap-4">
            <p className="font-[500]">Status Capaian</p>
            <p className="font-[500]">Cluster Jurnal Penerbit</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-3">
              <span>:</span>
              <p>
                {data?.data?.target_capaian_proposal?.status_capaian === "null"
                  ? "-"
                  : data?.data?.target_capaian_proposal?.status_capaian}
              </p>
            </div>
            <div className="flex gap-3">
              <span>:</span>
              <p>{data?.data?.target_capaian_proposal?.tahun_capaian}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
