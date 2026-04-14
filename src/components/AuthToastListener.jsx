"use client";

import { useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toastSuccessTop } from "../lib/toast";

export default function AuthToastListener() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const shown = useRef(false);

  useEffect(() => {
    const auth = searchParams.get("auth");

    if (auth === "success" && !shown.current) {
      shown.current = true;

      toastSuccessTop(
        "Login successful",
        "Welcome back! Your order products are ready to checkout.",
      );

      router.replace("/");
    }
  }, [searchParams, router]);

  return null;
}
