import { capitalFirtsLatter } from "@/lib/utils/capitalizeFirstLetter";
import Image from "next/image";

export const Tab = ({ tabName, tabActive, iconSrc, onClick }) => {
  return (
    <button
      className={`flex gap-2 items-center px-4 py-2 ${
        tabActive === tabName
          ? "bg-[#10487A] rounded text-white transition-colors"
          : ""
      }`}
      onClick={onClick}
    >
      {iconSrc && (
        <Image
          src={iconSrc[tabActive === tabName ? "white" : "black"]}
          width={24}
          height={24}
          alt='tab'
        />
      )}
      <p>{capitalFirtsLatter(tabName)}</p>
    </button>
  );
};
