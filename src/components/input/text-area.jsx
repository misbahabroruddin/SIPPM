"use client";

import { twMerge } from "tailwind-merge";

import { Label } from "../label";

export const TextArea = ({
  containerClass,
  labelClass,
  label,
  name,
  placeholder,
  register,
  errors,
  spanEmptyClass,
  cols = 30,
  rows = 3,
  required,
  textAreaClass,
  ...props
}) => {
  return (
    <div className="flex flex-col">
      <div
        className={twMerge(
          "flex flex-col gap-1 lg:flex-row lg:gap-2",
          containerClass,
        )}
      >
        <Label
          htmlFor={name}
          text={label}
          required={required}
          className={labelClass}
        />
        <textarea
          className={twMerge(
            "w-full resize-none rounded-lg p-2 outline outline-1 outline-secondary-200 placeholder:text-sm focus:border-transparent focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:bg-gray-200",
            errors && "outline-red-500",
            textAreaClass,
          )}
          name={name}
          id={name}
          cols={cols}
          rows={rows}
          placeholder={placeholder}
          {...register}
          {...props}
        />
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
