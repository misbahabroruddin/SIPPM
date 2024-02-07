"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { axiosAuth } from "../axios";

export const useAxios = () => {
  const { data: session } = useSession();

  useEffect(() => {
    const axiosIntercept = axiosAuth.interceptors.request.use((config) => {
      config.headers["Authorization"] = `Bearer ${session?.user?.accessToken}`;
      return config;
    });
    return () => {
      axiosAuth.interceptors.request.eject(axiosIntercept);
    };
  }, [session]);

  return axiosAuth;
};
