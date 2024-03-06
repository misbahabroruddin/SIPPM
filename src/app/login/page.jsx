"use client";

import { Input } from "@/components/input/input";
import { Spinner } from "@material-tailwind/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();

  const { replace } = useRouter();

  const onSubmit = async (data) => {
    setIsLoading(true);
    const response = await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
      callbackUrl: `${window.location.origin}/dashboard`,
    });

    if (response.error) {
      toast.error("Username atau Password salah");
    }

    if (response.ok) {
      toast.success("Login berhasil");
    }
    setIsLoading(false);

    replace("/dashboard");

    resetField("password");
  };
  return (
    <div className="flex h-screen items-center">
      <div className="image hidden h-full lg:flex lg:w-4/6 lg:items-center lg:justify-center"></div>
      <div className="flex w-full items-center justify-center p-4 lg:w-1/2">
        <div className="flex w-full flex-col justify-center gap-4 rounded-xl px-6 py-10 shadow-custom lg:w-3/5">
          <h1 className="mb-5 text-center text-xl">Login to SIPPM UNSIA</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <Input
              containerClass="flex flex-col items-start gap-1"
              labelClass="flex items-start gap-1"
              label="Username"
              inputClass="rounded-lg border border-gray-500 px-3 py-2"
              register={register("username", {
                required: "Username harus diisi",
              })}
              errors={errors.username}
              name="username"
              required
              placeholder="Masukkan username"
              spanEmptyClass="hidden"
            />
            <Input
              containerClass="flex flex-col items-start gap-1"
              labelClass="flex items-start gap-1"
              label="Password"
              inputClass="rounded-lg border border-gray-500 px-3 py-2"
              register={register("password", {
                required: "Password harus diisi",
              })}
              errors={errors.password}
              name="password"
              required
              type="password"
              placeholder="Masukkan password"
              spanEmptyClass="hidden"
            />
            <button
              className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2 text-white disabled:cursor-not-allowed disabled:bg-gray-400"
              disabled={isLoading}
            >
              {isLoading && <Spinner className="h-4 w-4" />}
              <p>Login</p>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
