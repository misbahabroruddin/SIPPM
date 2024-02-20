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
    <div className='flex flex-col'>
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
              "w-full px-3 py-2 outline outline-1 outline-secondary-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent placeholder:text-sm disabled:bg-gray-200 disabled:cursor-not-allowed",
              errors && "outline-red-500",
              inputClass
            )}
            autoComplete='off'
            defaultValue={defaultValue}
            {...props}
          />
        </div>
      </div>
      {errors && (
        <div className='flex'>
          <span className='w-1/2'></span>
          <span className='w-full text-red-600 text-sm'>
            * {errors?.message}
          </span>
        </div>
      )}
    </div>
  );
};
