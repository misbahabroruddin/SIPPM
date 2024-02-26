"use client";

export const DetailIdentitasUsulan = ({ data }) => {
  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-lg font-[500]">Identitas Usulan</h4>
      <div className="flex justify-between text-black-07">
        <div className="flex w-2/5 justify-between">
          <div className="flex flex-col gap-4">
            <p className="font-[500]">Jenis Penelitian</p>
            <p className="font-[500]">Rumpun Ilmu</p>
            <p className="font-[500]">Bidang Fokus Penelitian</p>
            <p className="font-[500]">Tahun Usulan</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-3">
              <span>:</span>
              <p>{data?.data?.jenis_penelitian?.nama}</p>
            </div>
            <div className="flex gap-3">
              <span>:</span>
              <p>{data?.data?.rumpun_ilmu?.nama}</p>
            </div>
            <div className="flex gap-3">
              <span>:</span>
              <p>{data?.data?.bidang_fokus}</p>
            </div>
            <div className="flex gap-3">
              <span>:</span>
              <p>{data?.data?.tahun_usulan}</p>
            </div>
          </div>
        </div>
        <div className="flex w-2/5 justify-between">
          <div className="flex flex-col gap-4">
            <p className="font-[500]">Jangka Waktu Penelitian</p>
            <p className="font-[500]">Ringkasan Penelitian</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-3">
              <span>:</span>
              <p>{data?.data?.jangka_waktu}</p>
            </div>
            <div className="flex gap-3">
              <span>:</span>
              <p>{data?.data?.ringkasan}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
