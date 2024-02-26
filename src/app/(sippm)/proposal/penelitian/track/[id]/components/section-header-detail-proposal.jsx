"use client";

export const SectionHeaderDetailProposal = ({ data }) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-xl font-[500]">{data?.judul}</h1>
      <div className="flex w-3/4 justify-between text-black-07">
        <div className="flex w-2/5 justify-between">
          <div className="flex grow justify-between">
            <div className="flex flex-col gap-2">
              <p>Nama Lengkap</p>
              <p>Tempat Tanggal Lahir</p>
              <p>NIDN</p>
              <p>Pangkat/Golongan</p>
              <p>Jabatan Fungsional</p>
              <p>Program Studi</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-4">
                <span>:</span>
                <p>{data?.user?.biodata?.nama_lengkap}</p>
              </div>
              <div className="flex gap-4">
                <span>:</span>
                <p>{`${data?.user?.biodata?.tempat_lahir || ""} ${data?.user?.biodata?.tanggal_lahir}`}</p>
              </div>
              <div className="flex gap-4">
                <span>:</span>
                <p>{data?.user?.biodata.nidn_or_nidk_or_nim}</p>
              </div>
              <div className="flex gap-4">
                <span>:</span>
                <p>{data?.user?.biodata.pangkat_golongan || "-"}</p>
              </div>
              <div className="flex gap-4">
                <span>:</span>
                <p>{data?.user?.biodata.jabatan_fungsional?.nama || "-"}</p>
              </div>
              <div className="flex gap-4">
                <span>:</span>
                <p>{data?.user?.biodata.program_studi?.nama || "-"}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-2/5 justify-between">
          <div className="flex grow justify-between">
            <div className="flex flex-col gap-2">
              <p>Email</p>
              <p>Nomor Hp</p>
              <p>ID Sinta</p>
              <p>ID Scopus</p>
              <p>ID Google Scholar</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-4">
                <span>:</span>
                <p>{data?.user?.biodata?.email}</p>
              </div>
              <div className="flex gap-4">
                <span>:</span>
                <p>{data?.user?.biodata?.nomor_hp}</p>
              </div>
              <div className="flex gap-4">
                <span>:</span>
                <p>{data?.user?.biodata?.sinta_id || "-"}</p>
              </div>
              <div className="flex gap-4">
                <span>:</span>
                <p>{data?.user?.biodata?.scopus_id || "-"}</p>
              </div>
              <div className="flex gap-4">
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
