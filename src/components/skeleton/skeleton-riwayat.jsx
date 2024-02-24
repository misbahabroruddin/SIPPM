"use client";

export const SkeletonRiwayat = () => {
  return (
    <div className="flex gap-4">
      <span className="h-6 w-[180px] min-w-fit animate-pulse rounded bg-gray-200"></span>
      <div className="flex h-80 w-full flex-col gap-2 rounded-lg p-4 shadow-custom">
        <span className="h-4 w-12 min-w-fit animate-pulse rounded bg-gray-200"></span>
        <div className="flex justify-between">
          <span className="h-4 w-40 min-w-fit animate-pulse rounded bg-gray-200"></span>
          <div className="flex flex-col justify-center gap-2">
            <span className="h-5 w-20 min-w-fit animate-pulse items-center rounded bg-gray-200"></span>
            <span className="h-5 w-28 min-w-fit animate-pulse rounded bg-gray-200"></span>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <span
              key={index}
              className="h-5 w-full min-w-fit animate-pulse rounded bg-gray-200"
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};
