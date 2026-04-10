"use client";

import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { Suspense } from "react";
import ToastListener from "../components/ToastListener";

export default function Provider({ children }) {
  return (
    <SessionProvider refetchOnWindowFocus={false}>
      <Toaster position="top-center" />

      <Suspense fallback={null}>
        <ToastListener />
      </Suspense>

      <NextUIProvider>{children}</NextUIProvider>
    </SessionProvider>
  );
}
