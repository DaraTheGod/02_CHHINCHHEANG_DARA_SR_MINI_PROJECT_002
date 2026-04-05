// src/app/provider.js
"use client";

import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";

export default function Provider({ children }) {
  return (
    <SessionProvider refetchOnWindowFocus={false}>
      <NextUIProvider>{children}</NextUIProvider>
    </SessionProvider>
  );
}
