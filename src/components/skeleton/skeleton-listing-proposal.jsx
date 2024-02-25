"use client";

export const SkeletonListingProposal = () => {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div className="rounded-lg px-6 py-4 shadow" key={index}>
          <div className="flex items-center justify-between">
            <div className="flex w-full max-w-[631px] flex-col gap-2">
              <span className="h-6 w-1/2 animate-pulse rounded bg-gray-200 text-lg"></span>
              <div className="flex gap-4">
                <span className="h-6 w-3/4 animate-pulse rounded bg-gray-200 text-lg"></span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
