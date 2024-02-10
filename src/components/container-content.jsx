import { twMerge } from "tailwind-merge";

export const ContainerContent = ({ children, className }) => {
  return (
    <div
      className={twMerge(
        "flex flex-col gap-6 p-6 shadow-custom w-full rounded-lg",
        className
      )}
    >
      {children}
    </div>
  );
};
