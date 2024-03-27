export const CardDashboard = ({
  title,
  jumlah = "10",
  status = "Disetujui",
}) => {
  let bgCard;
  if (status === "Disetujui") {
    bgCard = "bg-green-06";
  } else if (status === "Ditolak") {
    bgCard = "bg-red-06";
  } else if (status === "Revisi") {
    bgCard = "bg-[#d1c892]";
  } else if (status === "Pending") {
    bgCard = "bg-sky-06";
  } else {
    bgCard = "bg-primary";
  }
  return (
    <div
      className={`flex w-[30%] flex-col items-center justify-center gap-2 rounded-lg lg:w-[20%] ${bgCard} p-3 font-[500] text-white`}
    >
      <p className="text-sm">{title}</p>
      <div className="flex flex-col items-center gap-2 font-[500]">
        <p className="text-4xl">{jumlah}</p>
        <p>{status}</p>
      </div>
    </div>
  );
};
