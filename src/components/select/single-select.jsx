"use client";

import { useId } from "react";
import ReactSelect from "react-select";
import { Label } from "../label";

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
  defaultValue,
  props,
}) => {
  return (
    <div className='flex flex-col'>
      <div className='flex items-center'>
        <Label htmlFor={name} text={label} required={required} />
        <div className='flex flex-col w-full'>
          <Controller
            name={name}
            control={control}
            render={({ field: { onChange } }) => (
              <ReactSelect
                isClearable
                options={options}
                onChange={(val) => onChange(val?.value)}
                placeholder={placeholder}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 7,
                  colors: {
                    ...theme.colors,
                    primary25: "#eee",
                    primary: "#333333",
                  },
                })}
                className={`w-full ${errors ? "required" : ""}`}
                classNamePrefix='react-select'
                instanceId={id}
                isLoading={isLoading}
                isDisabled={isLoading}
                defaultValue={defaultValue}
              />
            )}
            rules={rules}
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
