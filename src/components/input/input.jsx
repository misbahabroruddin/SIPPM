"use client";

import { twMerge } from "tailwind-merge";
import { Label } from "../label";

export const Input = ({
  label = "Jenis Penelitian",
  name,
  type,
  register,
  placeholder = "Jenis Penelitian",
  containerClass,
  labelClass,
  inputClass,
  errors,
  required,
  defaultValue,
  ...props
}) => {
  return (
    <div className={twMerge("flex items-center", containerClass)}>
      {label && (
        <Label
          className={labelClass}
          htmlFor={name}
          text={label}
          required={required}
        />
      )}
      <div className='w-full ml-[1px] '>
        <input
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          {...register}
          className={twMerge(
            "w-full px-3 py-2 outline outline-1 outline-secondary-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent placeholder:text-sm",
            errors && "outline-red-500",
            inputClass
          )}
          autoComplete='off'
          defaultValue={defaultValue}
          {...props}
        />
      </div>
    </div>
  );
};
