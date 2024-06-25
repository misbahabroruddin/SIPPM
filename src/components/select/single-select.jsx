"use client";

import { useId } from "react";
import ReactSelect from "react-select";
import { Label } from "../label";
import { twMerge } from "tailwind-merge";

export const SingleSelect = ({
  Controller,
  label,
  name,
  placeholder,
  control,
  options,
  rules,
  required,
  errors,
  id,
  isLoading,
  isDisabled,
  defaultValue,
  hideSelectedOptions,
  spanEmptyClass,
  maxMenuHeight = 100,
  backgroundColor = "white",
  borderColor = "#eeeeee",
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
            render={({ field: { onChange } }) => (
              <ReactSelect
                isClearable
                options={options}
                onChange={(val) => onChange(val?.value)}
                placeholder={placeholder}
                isSearchable
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 7,
                  colors: {
                    ...theme.colors,
                    primary25: "#eee",
                    primary: "#333333",
                  },
                })}
                styles={{
                  control: (base) => ({
                    ...base,
                    paddingInline: "2px",
                    backgroundColor: backgroundColor,
                  }),
                }}
                className={`w-full ${errors ? "required" : ""}`}
                classNamePrefix="react-select"
                instanceId={id}
                isLoading={isLoading}
                isDisabled={isDisabled ? isDisabled : isLoading}
                defaultValue={defaultValue}
                hideSelectedOptions={hideSelectedOptions}
                maxMenuHeight={maxMenuHeight}
                {...props}
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
