import { twMerge } from "tailwind-merge";

export const Label = ({ htmlFor, text, required, className }) => {
  return (
    <label htmlFor={htmlFor} className={twMerge("w-1/2 font-[300]", className)}>
      {text}
      {required && <span className='text-red-500 text-xs ml-[2px]'>*</span>}
    </label>
  );
};
