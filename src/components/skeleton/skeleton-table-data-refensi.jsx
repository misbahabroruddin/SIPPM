"use client";

export const SkeletonTableDataRefensi = () => {
  return (
    <div className="flex animate-pulse flex-col ">
      <div className="mb-4 flex justify-between rounded-lg ">
        <span className="flex h-9 w-60 flex-wrap gap-3 rounded bg-secondary-200"></span>
        <div className="flex gap-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <span
              key={index}
              className="flex h-9 w-36 flex-wrap gap-3 rounded bg-secondary-200"
            ></span>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 rounded-lg rounded-b-none bg-primary px-2 py-4">
        <span className="flex flex-wrap gap-3 py-2"></span>
      </div>
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          className="flex animate-pulse items-center justify-center gap-2 px-2 py-4 even:bg-sky"
          key={index}
        >
          <span className="flex flex-wrap gap-3 bg-gray-400 py-1"></span>
        </div>
      ))}
    </div>
  );
};
