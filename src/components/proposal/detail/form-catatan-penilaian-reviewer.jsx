"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { ButtonSave } from "@/components/button/button-save";
import { TextArea } from "@/components/input/text-area";
import { useQueryLaporanHasilReviewer } from "@/handlers/reviewer/laporan-hasil/query-get-laporan-hasil";
import { useUpdatePenilaian } from "@/handlers/reviewer/laporan-hasil/update-nilai";
import { useUpdateCatatanReviewer } from "@/handlers/reviewer/laporan-hasil/update-catatan";
import { useQueryCatatanReviewer } from "@/handlers/reviewer/laporan-hasil/query-get-catatan";

export const FormCatatanReviewer = () => {
  const [id, setId] = useState();
  const [errorMessage, setErrorMessage] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm();

  const { data: dataLaporanHasil, refetch } = useQueryLaporanHasilReviewer();

  const { data: dataCatatan, refetch: refetchCatatanReviewer } =
    useQueryCatatanReviewer();

  const { handleUpdateNilai, isLoading: isLoadingUpdateNilai } =
    useUpdatePenilaian();

  const { mutateAsync: onSubmitCatatan } = useUpdateCatatanReviewer();

  useEffect(() => {
    refetch();
    refetchCatatanReviewer();
  }, []);

  useEffect(() => {
    dataLaporanHasil?.data?.forEach((item, index) => {
      setValue(`skor${index}`, parseInt(item?.skor)),
        setValue(`nilai${index}`, parseInt(item?.nilai));
    });
  }, [dataLaporanHasil]);

  useEffect(() => {
    setValue("catatan", dataCatatan?.data?.catatan_reviewer);
  }, [dataCatatan]);

  return (
    <div className="flex flex-col gap-2 overflow-hidden rounded-lg">
      <div className="text-sm font-normal ">
        <div className="flex bg-primary py-3 font-[500] text-white">
          <p className="basis-28 text-center">No</p>
          <p className="grow text-center">Penilaian</p>
          <p className="basis-32 text-center">Bobot &#40;%&#41;</p>
          <p className="basis-40 text-center">Skor *&#41;</p>
          <p className="basis-40 text-center">Nilai</p>
        </div>
        <div className="flex flex-col">
          {dataLaporanHasil?.data?.length ? (
            <>
              {dataLaporanHasil?.data.map((item, index) => (
                <div
                  className="flex items-center py-2 even:bg-blue-09"
                  key={item.id}
                >
                  <p className="basis-28 text-center">{index + 1}</p>
                  <div className="flex grow flex-col py-2">
                    <p>{item.kriteria_penilaian.nama}</p>
                    <ul
                      className="ml-4"
                      style={{ listStyleType: "lower-alpha" }}
                    >
                      {item.kriteria_penilaian.komponen_penilaians?.map(
                        (komponen) => (
                          <li key={komponen.id}>{komponen.nama}</li>
                        ),
                      )}
                    </ul>
                  </div>
                  <div className="flex basis-32 justify-center">
                    <p>{item.bobot}</p>
                  </div>
                  <div className="flex basis-40 flex-col justify-center">
                    <input
                      type="number"
                      className="mx-auto w-28 rounded-lg border px-2 py-1 "
                      placeholder="Skor"
                      {...register("skor" + index, {
                        required: "Harus diisi",
                        onBlur: async (e) => {
                          if (e.target.value <= 7) {
                            setErrorMessage(false);
                            await handleUpdateNilai(id, e.target.value);
                          }
                        },
                        onChange: (e) => {
                          if (e.target.value > 7) {
                            setErrorMessage(true);
                          } else {
                            setErrorMessage(false);
                          }
                        },
                        valueAsNumber: true,
                        min: 1,
                        max: 7,
                      })}
                      onFocus={() => setId(item.id)}
                      min={1}
                      max={7}
                      defaultValue={item?.skor ? parseInt(item.skor) : ""}
                      tabIndex={1}
                      disabled={isLoadingUpdateNilai}
                    />
                  </div>
                  <div className="flex basis-40 justify-center">
                    <input
                      type="number"
                      className="mx-auto w-28 cursor-default rounded-lg border px-2 py-1 focus:outline-none focus:ring-0"
                      placeholder="Nilai"
                      readOnly
                      {...register("nilai" + index)}
                      defaultValue={item.nilai ? parseInt(item.nilai) : ""}
                    />
                  </div>
                </div>
              ))}
              {errorMessage && (
                <p className="ml-auto text-xs text-red-500">Maksimal skor 7</p>
              )}
            </>
          ) : null}

          <div className="flex items-center py-2">
            <div className="basis-28"></div>
            <div className="flex grow flex-col py-2">
              <p>JUMLAH</p>
            </div>
            <div className="flex basis-32 justify-center">
              <p>
                {dataLaporanHasil?.data.reduce((total, item) => {
                  return total + parseInt(item.bobot);
                }, 0)}
              </p>
            </div>
            <div className="flex basis-40 justify-center"></div>
            <div className="flex basis-40 justify-center">
              <p className="mx-auto w-28 cursor-default border-none px-2 py-1 focus:outline-none focus:ring-0">
                {dataLaporanHasil?.data.reduce((total, item) => {
                  return parseInt(total) + parseInt(item.nilai);
                }, 0) || ""}
              </p>
            </div>
          </div>
        </div>
      </div>
      <form
        className="flex flex-col gap-4 bg-blue-09"
        onSubmit={handleSubmit(onSubmitCatatan)}
      >
        <div className="px-6 py-4 text-black-06">
          <p className="mb-2">Catatan :</p>
          <TextArea
            labelClass="hidden"
            register={register("catatan", {
              required: "Harus diisi",
            })}
            errors={errors.catatan}
            required
            spanEmptyClass="hidden"
            defaultValue={dataCatatan?.data?.catatan_reviewer}
            placeholder="Masukkan catatan"
          />
          <ButtonSave className="mx-auto mt-3" />
        </div>
      </form>
    </div>
  );
};
