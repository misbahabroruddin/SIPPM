"use client";

import { twMerge } from "tailwind-merge";
import { Label } from "../label";

export const Input = ({
  label,
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
  spanEmptyClass,
  ...props
}) => {
  return (
    <div className="flex flex-col">
      <div className={twMerge("flex items-center", containerClass)}>
        {label && (
          <Label
            className={labelClass}
            htmlFor={name}
            text={label}
            required={required}
          />
        )}
        <div className="ml-[1px] w-full ">
          <input
            type={type}
            name={name}
            id={name}
            placeholder={placeholder}
            {...register}
            className={twMerge(
              "w-full rounded-md px-3 py-2 outline outline-1 outline-secondary-200 placeholder:text-sm focus:border-transparent focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:bg-gray-200",
              errors && "outline-red-500",
              inputClass,
            )}
            autoComplete="off"
            defaultValue={defaultValue}
            {...props}
          />
        </div>
      </div>
      {errors && (
        <div className="flex">
          <span className={twMerge("w-1/2", spanEmptyClass)}></span>
          <span className="w-full text-sm text-red-600">
            * {errors?.message}
          </span>
        </div>
      )}
    </div>
  );
};
