"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@nextui-org/react";
import { loginAction } from "../../../action/auth.action";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export default function LoginFormComponent() {
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data) => {
    setSubmitError("");
    try {
      await loginAction(data);
    } catch (error) {
      if (
        error.message === "NEXT_REDIRECT" ||
        error.digest?.includes("NEXT_REDIRECT")
      ) {
        return;
      }
      setSubmitError("Invalid email or password. Please try again.");
    }
  };

  return (
    <form
      className="mt-8 space-y-5"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      {submitError && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {submitError}
        </div>
      )}

      {/* Email */}
      <div>
        <label
          htmlFor="login-email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="login-email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          {...register("email")}
          className={`mt-1.5 w-full rounded-xl border px-4 py-3 text-sm outline-none ring-lime-400/20 focus:ring-2 ${
            errors.email
              ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
              : "border-gray-200 bg-white focus:border-lime-400"
          }`}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="login-password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          id="login-password"
          type="text"
          autoComplete="current-password"
          placeholder="••••••••"
          {...register("password")}
          className={`mt-1.5 w-full rounded-xl border px-4 py-3 text-sm outline-none ring-lime-400/20 focus:ring-2 ${
            errors.password
              ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
              : "border-gray-200 bg-white focus:border-lime-400"
          }`}
        />
        {errors.password && (
          <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
        )}
      </div>

      <Button
        type="submit"
        isLoading={isSubmitting}
        disabled={isSubmitting}
        className="w-full rounded-full bg-lime-400 py-3.5 text-sm font-semibold text-gray-900 shadow-sm transition hover:bg-lime-300"
      >
        {isSubmitting ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
}
