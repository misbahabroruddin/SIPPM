import { twMerge } from "tailwind-merge";

export const ContainerContent = ({ children, className }) => {
  return (
    <div
      className={twMerge(
        "flex w-full flex-col gap-3 rounded-lg p-3 shadow-custom lg:gap-6 lg:p-6",
        className,
      )}
    >
      {children}
    </div>
  );
};
