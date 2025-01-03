"use client";

import React from "react";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const Toast = () => (
  <ToastContainer
    position="top-center"
    autoClose={5000}
    closeOnClick
    draggable
    pauseOnHover
    pauseOnFocusLoss={false}
    hideProgressBar
    theme="colored"
  />
);

export default Toast;
