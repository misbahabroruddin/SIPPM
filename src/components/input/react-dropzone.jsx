"use client";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useForm } from "react-hook-form";

import { UploadCloudIcon } from "../svgs/upload-cloud";
import { WindowCloseIcon } from "../svgs/window-close";

const ReactDropzone = ({ onClose }) => {
  const [insertedFiles, setInsertedFiles] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onDrop = useCallback((acceptedFiles) => {
    // acceptedFiles.forEach((file) => {
    //   const reader = new FileReader();

    //   reader.onabort = () => console.log("file reading was aborted");
    //   reader.onerror = () => console.log("file reading has failed");
    //   reader.onload = () => {
    //     const binaryStr = reader.result;
    //   };
    //   reader.readAsArrayBuffer(file);
    // });
    setInsertedFiles([...insertedFiles, ...acceptedFiles]);
    const newFiles =
      (!!files?.length && [...files].concat(acceptedFiles)) || acceptedFiles;
    setValue("files", newFiles, { shouldValidate: true });
  }, []);

  const onSubmit = (data) => {
    console.log(data);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/pdf": [],
    },
    maxFiles: 4,
    onDrop,
    multiple: true,
  });

  const removeFile = (file) => () => {
    const newFiles = [...insertedFiles];
    newFiles.splice(newFiles.indexOf(file), 1);
    setInsertedFiles(newFiles);
    setValue("files", newFiles, { shouldValidate: true });
  };

  const files = insertedFiles.map((file) => (
    <li key={file.path} className="my-2">
      <div className="flex justify-between">
        <div
          className="flex w-2/5 items-center justify-between gap-2 rounded-lg bg-white p-2"
          title={file.path}
        >
          <div className="flex gap-2">
            <Image src="/icons/pdf.svg" height={32} width={32} alt="pdf" />
            <div className="flex flex-col">
              <p className="line-clamp-1 w-[90%] cursor-default text-[14px] text-xs">
                {file.path}
              </p>
              <p className="text-xs">{Math.round(file.size / 1024)} Kb</p>
            </div>
          </div>
          <WindowCloseIcon onClick={removeFile(file)} />
        </div>
        <div className="grid h-10 w-1/4 place-items-center overflow-hidden rounded-lg border border-black-07">
          <select
            name="jenis_dokumen"
            id="jenis_dokumen"
            className="h-full w-full border border-r-8 border-transparent bg-transparent pl-3 focus:outline-none"
            defaultValue={""}
          >
            <option value="" disabled>
              Pilih dokumen
            </option>
            <option value="cv">CV</option>
            <option value="pernyataan_mitra">Pernyataan Mitra</option>
          </select>
        </div>
      </div>
    </li>
  ));

  useEffect(() => {
    console.log(insertedFiles[0]);
  }, [insertedFiles]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        {...getRootProps({
          className: twMerge(
            "py-12 gap-4 rounded-lg grid place-items-center mb-4 mt-[18px]",
            isDragActive ? "bg-[#D9D9D9]/40" : "bg-[#D9D9D9]",
          ),
        })}
      >
        <input
          {...getInputProps()}
          {...register("files")}
          onChange={(e) => setInsertedFiles(e.target?.files[0])}
        />
        <UploadCloudIcon height={32} width={32} />

        <p>Drag and Drop File or Chose On Pc</p>
      </div>
      <div className="flex flex-col gap-4">
        {insertedFiles.length ? (
          <>
            <ul className="rounded-lg bg-sky px-4 py-2">{files}</ul>
            <div className="flex justify-end gap-4">
              <button
                className="rounded-lg border border-blue-primary bg-transparent px-4 py-[6px] text-blue-primary"
                onClick={onClose}
              >
                Cancel
              </button>
              <button className="rounded-lg bg-primary px-4 py-[6px] text-white">
                Submit
              </button>
            </div>
          </>
        ) : null}
      </div>
    </form>
  );
};

export default ReactDropzone;
