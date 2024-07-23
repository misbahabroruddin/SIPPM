"use client";

import { NumericFormat } from "react-number-format";
import { Label } from "../label";
import { twMerge } from "tailwind-merge";

export const CurrencyInput = ({
  Controller,
  label,
  name,
  placeholder,
  control,
  rules,
  required,
  errors,
  isLoading,
  isDisabled,
  defaultValue,
  spanEmptyClass,
  ...props
}) => {
  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col items-start gap-1 lg:flex-row lg:items-center lg:gap-0">
        {label && (
          <Label
            htmlFor={name}
            text={label}
            required={required}
            className={"w-full text-sm font-[500] text-primary lg:w-1/2"}
          />
        )}
        <div className="flex w-full flex-col">
          <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumericFormat
                defaultValue={defaultValue}
                prefix="Rp "
                thousandSeparator="."
                decimalSeparator=","
                onValueChange={(val) => {
                  onChange(val?.floatValue);
                }}
                id={name}
                name={name}
                className={twMerge(
                  "w-full rounded-md px-3 py-[6px] outline outline-1 outline-secondary-200 placeholder:text-sm focus:border-transparent focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:bg-gray-200",
                  errors && "outline-red-500",
                )}
                value={value}
                placeholder={placeholder}
              />
            )}
            rules={rules}
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
