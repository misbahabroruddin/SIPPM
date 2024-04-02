import Image from "next/image";

export const BasePageTitle = ({
  iconSrc = "/icons/dashcube.svg",
  title = "Dashboard",
}) => {
  return (
    <div className="flex items-center gap-1">
      <Image src={iconSrc} width={24} height={24} alt="Dashboard" />
      <p className="text-base font-[500] lg:text-xl">{title}</p>
    </div>
  );
};
