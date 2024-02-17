import Image from "next/image";

export const BasePageTitle = ({
  iconSrc = "/icons/dashcube.svg",
  title = "Dashboard",
}) => {
  return (
    <div className='flex items-center gap-1 '>
      <Image
        className='my-1'
        src={iconSrc}
        width={24}
        height={24}
        alt='Dashboard'
      />
      <p className='text-xl font-[500]'>{title}</p>
    </div>
  );
};
