"use client";

import { signIn } from "next-auth/react";
import { useEffect } from "react";

export default function Login() {
  useEffect(() => {
    signIn("sso");
  }, []);
  return (
    <div className="relative flex h-screen items-center justify-center font-poppins">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-gray-300 border-t-primary" />
    </div>
  );
}
