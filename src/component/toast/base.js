import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
export function PendingToast(messgae) {
  const Toast = toast.loading(messgae, { newestOnTop: true, autoClose: 15000 });
  return Toast;
}

export function ToastToSuccess(Pendingtoast, messgae) {
  toast.update(Pendingtoast, {
    render: messgae,
    theme: "colored",
    type: "success",
    isLoading: false,
    closeButton: true,
    newestOnTop: true,
    autoClose: 3000,
  });
}

export function ToastToError(Pendingtoast, messgae) {
  toast.update(Pendingtoast, {
    render: messgae,
    theme: "colored",
    type: "error",
    isLoading: false,
    closeButton: true,
    newestOnTop: true,
    autoClose: 3000,
    limit: 1,
  });
}

export function ErrorToast(messgae) {
  toast.error(messgae, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
}

export function successToast(messgae) {
  toast.success(messgae, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
}

export function SuccessToast(messgae) {
  toast.success(messgae, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
}

export function BaseToastContainar() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
}

export function ClearAllToast() {
  toast.dismiss();
}
