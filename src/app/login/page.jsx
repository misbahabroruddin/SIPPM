"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";

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
        <div className="flex w-full flex-col justify-center gap-4 lg:w-1/2">
          <h1 className="mb-5 text-center text-xl">Login to SIPPM UNSIA</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <div className="flex flex-col gap-1">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                className={twMerge(
                  "rounded-lg border border-gray-500 px-3 py-2",
                  errors.username ? "border-red-500" : "",
                )}
                {...register("username", { required: "Username harus diisi" })}
                placeholder="Masukkan Username"
              />
              {errors.username && (
                <p className="text-red-500">{errors.username.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className={twMerge(
                  "rounded-lg border border-gray-500 px-3 py-2",
                  errors.password ? "border-red-500" : "",
                )}
                {...register("password", { required: "Password harus diisi" })}
                placeholder="Masukkan password"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            <button
              className="mt-4 rounded-lg bg-[#10487A] px-3 py-2 text-white disabled:cursor-not-allowed disabled:bg-gray-400"
              disabled={isLoading}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
