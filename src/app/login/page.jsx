"use client";

import { signIn } from "next-auth/react";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function Login() {
  const handleLoginSSO = async () => {
    const response = await signIn("sso", {
      callbackUrl: "/dashboard",
      redirect: false,
    });
    if (!response) toast.error("Internal server error");
  };

  useEffect(() => {
    handleLoginSSO();
  }, []);
  return (
    <div className="relative flex h-screen items-center justify-center font-poppins">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-gray-300 border-t-primary" />
    </div>
  );
}
