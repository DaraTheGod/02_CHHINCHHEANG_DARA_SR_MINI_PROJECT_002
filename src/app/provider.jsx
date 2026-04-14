"use client";

import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

export default function Provider({ children }) {
  return (
    <NextUIProvider>
      <SessionProvider refetchOnWindowFocus={false}>
        <Toaster richColors position="top-center" />
        {children}
      </SessionProvider>
    </NextUIProvider>
  );
}
