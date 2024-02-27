import Image from "next/image";

export const EmptyState = () => {
  return (
    <div className="flex w-full flex-col justify-center gap-4">
      <Image
        src="/empty-state.png"
        alt="empty state"
        width={450}
        height={350}
        className="mx-auto"
      />
      <div className="font-2xl text-center font-semibold tracking-wider text-blue-primary">
        Tidak ada data
      </div>
    </div>
  );
};
