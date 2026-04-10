"use client";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { showIslandToast } from "../utils/toast";

export default function ToastListener() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const auth = searchParams.get("auth");

    if (auth === "success") {
      showIslandToast(
        "Welcome Back",
        "Successfully signed into your glow routine.",
      );

      router.replace("/", { scroll: false });
    }
  }, [searchParams, router]);

  return null;
}
