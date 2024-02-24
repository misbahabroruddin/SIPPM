"use client";

import { ButtonStatus } from "@/components/button/button-status";
import { ContainerContent } from "@/components/container-content";
import {
  TimelineContent,
  TimelineHeader,
  TimelineItem,
} from "@/components/timeline";
import { convertToRupiah } from "@/lib/utils/convertToRupiah";

export const RiwayatPenelitianReviewer = () => {
  return (
    <TimelineItem>
      <TimelineHeader />
      <TimelineContent>
        <ContainerContent className=''>
          <div className='flex flex-col gap-2  justify-between w-full '>
            <div className='flex grow text-dark-80 font-[500]'>
              <p>Reviewer</p>
            </div>
            <div className='flex justify-between items-center grow'>
              <p className='text-dark-09'>Nama reviewer</p>
              <ButtonStatus
                status='null'
                className='px-2 py-1 text-xs font-[500]'
              />
            </div>
            <p className='text-primary font-semibold text-end'>
              {convertToRupiah(0)}
            </p>
          </div>
        </ContainerContent>
      </TimelineContent>
    </TimelineItem>
  );
};
