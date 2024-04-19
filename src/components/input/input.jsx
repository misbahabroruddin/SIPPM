"use client";

import { twMerge } from "tailwind-merge";
import { Label } from "../label";
import Image from "next/image";

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
  icon,
  iconPassword,
  togglePassword,
  ...props
}) => {
  return (
    <div className="flex flex-col">
      <div
        className={twMerge(
          "flex flex-col items-start gap-1 lg:flex-row lg:items-center lg:gap-0",
          containerClass,
        )}
      >
        {label && (
          <Label
            className={labelClass}
            htmlFor={name}
            text={label}
            required={required}
          />
        )}
        <div className="relative ml-[1px] w-full">
          {icon ? (
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Image src={icon} width={20} height={20} alt="icon" />
            </div>
          ) : null}
          <input
            type={type}
            name={name}
            id={name}
            placeholder={placeholder}
            {...register}
            className={twMerge(
              "w-full rounded-md px-3 py-2 outline outline-1 outline-secondary-200 placeholder:text-sm focus:border-transparent focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:bg-gray-200",
              errors && "outline-red-500",
              icon ? "placeholder:pl-8 focus-within:pl-8" : "",
              inputClass,
            )}
            autoComplete="off"
            defaultValue={defaultValue}
            {...props}
          />
          {iconPassword ? (
            <div
              className="input-focus-visible:opacity-100 absolute inset-0 right-0 ml-auto mr-3 flex w-fit cursor-pointer items-center opacity-50 hover:opacity-100"
              onClick={togglePassword}
            >
              {type === "password" ? (
                <Image
                  src="/icons/eye-open.svg"
                  width={20}
                  height={20}
                  alt="open"
                />
              ) : (
                <Image
                  src="/icons/eye-close.svg"
                  width={20}
                  height={20}
                  alt="close"
                />
              )}
            </div>
          ) : null}
        </div>
      </div>
      {errors && (
        <div className="flex">
          <span className={twMerge("w-1/2", spanEmptyClass)}></span>
          <span className="w-full text-start text-sm text-red-600">
            * {errors?.message}
          </span>
        </div>
      )}
    </div>
  );
};
