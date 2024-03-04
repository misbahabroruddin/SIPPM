"use client";

import { ButtonStatus } from "@/components/button/button-status";
import { ContainerContent } from "@/components/container-content";
import {
  TimelineConnector,
  TimelineContent,
  TimelineHeader,
  TimelineItem,
} from "@/components/timeline";
import { convertToRupiah } from "@/lib/utils/convertToRupiah";

export const RiwayatPenelitianReviewer = () => {
  return (
    <TimelineItem>
      <TimelineConnector />
      <TimelineHeader />
      <TimelineContent>
        <ContainerContent className="">
          <div className="flex w-full flex-col  justify-between gap-2 ">
            <div className="flex grow font-[500] text-dark-80">
              <p>Reviewer</p>
            </div>
            <div className="flex grow items-center justify-between">
              <p className="text-dark-09">Nama reviewer</p>
              <ButtonStatus
                status="null"
                className="px-2 py-1 text-xs font-[500]"
              />
            </div>
            <p className="text-end font-semibold text-primary">
              {convertToRupiah(0)}
            </p>
          </div>
        </ContainerContent>
      </TimelineContent>
    </TimelineItem>
  );
};
