import { capitalFirtsLatter } from "@/lib/utils/capitalizeFirstLetter";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

export const Tab = ({
  tabName,
  tabActive,
  iconSrc,
  onClick,
  tabActiveClass,
  className,
  upperCase,
  statusDraft,
}) => {
  return (
    <button
      className={`relative flex w-fit items-center justify-center gap-2 px-3 py-2 lg:px-4 ${
        tabActive === tabName
          ? twMerge("rounded bg-[#10487A] text-white", tabActiveClass)
          : className
      }`}
      onClick={onClick}
    >
      {iconSrc && (
        <Image
          src={iconSrc[tabActive === tabName ? "white" : "black"]}
          width={24}
          height={24}
          alt="tab"
          className="hidden lg:block"
        />
      )}
      {statusDraft ? (
        <span className="absolute -right-1 -top-2 h-5 w-5 rounded-full bg-red-06 text-sm font-[500] text-white">
          !
        </span>
      ) : null}
      <p>{upperCase ? tabName : capitalFirtsLatter(tabName)}</p>
    </button>
  );
};
