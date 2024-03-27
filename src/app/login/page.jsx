"use client";

import { Input } from "@/components/input/input";
import { Spinner } from "@material-tailwind/react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
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
      callbackUrl: `${window.location.href}/dashboard`,
    });

    if (response.error) {
      toast.error("Username atau Password salah");
    }

    if (response.ok) {
      toast.success("Login berhasil");
      location.href = "/dashboard";
    }
    setIsLoading(false);

    resetField("password");
  };

  useEffect(() => {
    signIn("sso", {
      callbackUrl: "/api/auth/callback/sso",
      redirect: false,
    });
  }, []);
  return (
    <div className="relative flex h-screen items-center justify-center font-poppins">
      <div className="image absolute block h-full w-screen lg:flex lg:items-center lg:justify-center"></div>
      {/* <div className="h-10 w-10 animate-spin rounded-full border-2 border-gray-300 border-t-primary" /> */}
      <div className="z-50 mx-auto flex w-full items-center justify-center p-4 lg:w-1/2">
        <div className="flex w-3/4 flex-col justify-center gap-4 rounded-xl bg-white px-6 py-10 shadow-custom lg:w-3/6">
          <Image
            src={"/logo-unsia.png"}
            width={140}
            height={140}
            alt={"Universitas Siber Asia"}
            className="mx-auto w-[120px] lg:w-[140px]"
          />
          <h1 className="mb-2 text-center text-xl lg:text-2xl xl:text-3xl">
            Masuk ke SIPPM
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <Input
              containerClass="flex lg:flex-col items-start lg:items-start gap-1"
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
              containerClass="flex lg:flex-col items-start lg:items-start gap-1"
              labelClass="flex items-start gap-1"
              label="Password"
              inputClass="rounded-lg border border-gray-500 px-3 py-2"
              register={register("password", {
                required: "Password harus diisi",
              })}
              errors={errors.password}
              name="password"
              required
              type={isShowPassword ? "text" : "password"}
              placeholder="Masukkan password"
              spanEmptyClass="hidden"
              iconPassword
              togglePassword={() => setIsShowPassword(!isShowPassword)}
              icon="/icons/password.svg"
            />
            <button
              className="mt-4 flex items-center justify-center gap-2 rounded-full bg-primary px-3 py-2 text-white disabled:cursor-not-allowed disabled:bg-gray-400"
              disabled={isLoading}
            >
              {isLoading && <Spinner className="h-4 w-4" />}
              <p>Sign-in</p>
            </button>
          </form>
          <div className="flex flex-col gap-1">
            <p className="text-center text-xs text-gray-600">or</p>
            <button
              onClick={() => signIn("sso")}
              className="border-dark-metallic mt-2 flex items-center justify-center gap-3 rounded-full border py-2 text-black"
            >
              <svg
                width="22px"
                height="22px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M15.6807 14.5869C19.1708 14.5869 22 11.7692 22 8.29344C22 4.81767 19.1708 2 15.6807 2C12.1907 2 9.3615 4.81767 9.3615 8.29344C9.3615 9.90338 10.0963 11.0743 10.0963 11.0743L2.45441 18.6849C2.1115 19.0264 1.63143 19.9143 2.45441 20.7339L3.33616 21.6121C3.67905 21.9048 4.54119 22.3146 5.2466 21.6121L6.27531 20.5876C7.30403 21.6121 8.4797 21.0267 8.92058 20.4412C9.65538 19.4167 8.77362 18.3922 8.77362 18.3922L9.06754 18.0995C10.4783 19.5045 11.7128 18.6849 12.1537 18.0995C12.8885 17.075 12.1537 16.0505 12.1537 16.0505C11.8598 15.465 11.272 15.465 12.0067 14.7333L12.8885 13.8551C13.5939 14.4405 15.0439 14.5869 15.6807 14.5869Z"
                    stroke="#000000"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17.8853 8.29353C17.8853 9.50601 16.8984 10.4889 15.681 10.4889C14.4635 10.4889 13.4766 9.50601 13.4766 8.29353C13.4766 7.08105 14.4635 6.09814 15.681 6.09814C16.8984 6.09814 17.8853 7.08105 17.8853 8.29353Z"
                    stroke="#000000"
                    strokeWidth="1.5"
                  />
                </g>
              </svg>
              <p className="font-[500]">Sign-in with SSO</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
