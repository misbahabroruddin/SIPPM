"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";

export default function Login() {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();

  const { replace } = useRouter();

  const onSubmit = async (data) => {
    const response = await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
      callbackUrl: `${window.location.origin}/dashboard`,
    });

    if (response.ok) {
      toast.success("Login berhasil");
      replace("/dashboard");
    }

    if (response.error) {
      toast.error("Username atau Password salah");
    }

    resetField("password");
  };
  return (
    <div className='flex h-screen items-center'>
      <div className='hidden h-full lg:flex lg:w-1/2 lg:items-center lg:justify-center image'></div>
      <div className='flex justify-center items-center w-full lg:w-1/2 p-4'>
        <div className='flex flex-col gap-4 justify-center w-full lg:w-1/2'>
          <h1 className='text-center mb-5 text-xl'>Login to SIPPM UNSIA</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-2'
          >
            <div className='flex flex-col gap-1'>
              <label htmlFor='username'>Username</label>
              <input
                type='text'
                name='username'
                id='username'
                className={twMerge(
                  "border border-gray-500 py-2 px-3 rounded-lg",
                  errors.username ? "border-red-500" : ""
                )}
                {...register("username", { required: "Username harus diisi" })}
                placeholder='Masukkan Username'
              />
              {errors.username && (
                <p className='text-red-500'>{errors.username.message}</p>
              )}
            </div>
            <div className='flex flex-col gap-1'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                name='password'
                id='password'
                className={twMerge(
                  "border border-gray-500 py-2 px-3 rounded-lg",
                  errors.password ? "border-red-500" : ""
                )}
                {...register("password", { required: "Password harus diisi" })}
                placeholder='Masukkan password'
              />
              {errors.password && (
                <p className='text-red-500'>{errors.password.message}</p>
              )}
            </div>
            <button className='bg-[#10487A] text-white py-2 px-3 rounded-lg mt-4'>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
