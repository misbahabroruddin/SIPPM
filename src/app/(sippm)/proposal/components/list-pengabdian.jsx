"use client";

import Image from "next/image";
import Swal from "sweetalert2";
import Link from "next/link";

import { ButtonStatus } from "@/components/button/button-status";
import { convertDate } from "@/lib/utils/convertDate";
import { ButtonDelete } from "@/components/button/button-delete";
import { ButtonUpdate } from "@/components/button/button-update";
import { useDeletePengabdianDosen } from "@/handlers/pengabdian/delete-pengabdian-dosen";
import { useStep } from "@/lib/hooks/useStep";

export const ListPengabdian = ({
  pengabdian,
  currentTab,
  tabActive,
  isLoading,
}) => {
  if (isLoading)
    return (
      <div className='flex flex-col gap-4'>
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} />
        ))}
      </div>
    );
  return (
    <div className='flex flex-col gap-4'>
      {pengabdian?.length ? (
        pengabdian?.map((proposal) => (
          <ListItem
            key={proposal.id}
            data={proposal}
            currentTab={currentTab}
            tabActive={tabActive}
          />
        ))
      ) : (
        <div className='flex flex-col gap-4 justify-center w-full h-40'>
          <div className='text-center'>Tidak ada data</div>
        </div>
      )}
    </div>
  );
};

const ListItem = ({ data, currentTab, tabActive }) => {
  const { onDeletePengabdianDosen, isLoadingDelete } =
    useDeletePengabdianDosen();
  const { setCurrentStep } = useStep();

  return (
    <div
      className={`px-6 py-4 shadow rounded-lg ${
        data.status === "Draft" ? "bg-draft" : "inherit"
      }`}
      key={data?.id}
    >
      <div className='flex items-center justify-between'>
        <div className='flex flex-col gap-1 max-w-[631px]'>
          <h2 className='text-lg'>{data?.judul_pkm}</h2>
          <div className='flex gap-4'>
            <div className='flex gap-[2px] items-center'>
              <Image
                src='/icons/User.svg'
                height={24}
                width={24}
                alt='author'
              />
              <p className='text-sm text-[#999999]'>{data?.user.name}</p>
            </div>
            <div className='flex gap-[2px] items-center'>
              <Image
                src='/icons/Book.svg'
                height={24}
                width={24}
                alt='mata kuliah'
              />
              <p className='text-sm text-[#999999]'>
                {data?.user.biodata.program_studi.nama}
              </p>
            </div>
            <div className='flex gap-[2px] items-center'>
              <Image
                src='/icons/Clock.svg'
                height={24}
                width={24}
                alt='tanggal'
              />
              <p className='text-sm text-[#999999]'>
                {convertDate(data?.created_at)}
              </p>
            </div>
          </div>
        </div>
        <div className='flex items-end gap-4'>
          {data.status === "Terkirim" ? (
            <>
              <div className='flex flex-col items-center gap-1'>
                <p>LPPM</p>
                <ButtonStatus status={data?.status_lppm || "not-yet"} />
              </div>
              <div className='flex flex-col items-center gap-1'>
                <p>Review</p>
                <ButtonStatus status={data?.status_reviewer || "not-yet"} />
              </div>
              <Link
                href={`/proposal/${currentTab || tabActive}/track/${data?.id}`}
              >
                <button
                  className='px-7 py-2 bg-primary text-white rounded-lg disabled:bg-gray-500 disabled:cursor-not-allowed'
                  disabled={data?.status_lppm === "Pending"}
                >
                  Track
                </button>
              </Link>
            </>
          ) : (
            <div className='flex gap-4'>
              <ButtonDelete
                onClick={() => {
                  Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    dangerMode: true,
                    showCancelButton: true,
                    confirmButtonText: "Yes, delete",
                    cancelButtonText: "No, cancel",
                    confirmButtonColor: "#0BD72C",
                    cancelButtonColor: "#E32626",
                    reverseButtons: true,
                  }).then((isConfirm) => {
                    if (isConfirm["isConfirmed"]) {
                      onDeletePengabdianDosen(data?.id);
                    }
                  });
                }}
                disabled={isLoadingDelete}
              />
              <Link href={`/proposal/pengabdian/edit/${data?.id}`}>
                <ButtonUpdate
                  onClick={() => {
                    localStorage.setItem("isEdit", true);
                    localStorage.setItem("step", 1);
                    setCurrentStep(1);
                  }}
                  disabled={isLoadingDelete}
                />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Skeleton = () => {
  return (
    <div className='px-6 py-4 shadow rounded-lg'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col gap-2 w-full max-w-[631px]'>
          <span className='text-lg animate-pulse h-6 w-1/2 bg-gray-200 rounded'></span>
          <div className='flex gap-4'>
            <span className='text-lg animate-pulse h-6 w-3/4 bg-gray-200 rounded'></span>
          </div>
        </div>
      </div>
    </div>
  );
};