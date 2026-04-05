"use client";

import { Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { registerAction } from "../../../action/auth.action";
import { useRouter } from "next/navigation";

function calculateAge(birthDate) {
  const today = new Date();
  const birth = new Date(birthDate);
  const age = today.getFullYear() - birth.getFullYear();
  const notYetBirthdayThisYear =
    today.getMonth() < birth.getMonth() ||
    (today.getMonth() === birth.getMonth() &&
      today.getDate() < birth.getDate());
  return notYetBirthdayThisYear ? age - 1 : age;
}

const registerSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .min(3, "Full name must be at least 3 characters")
    .refine(
      (name) => {
        const parts = name.trim().split(/\s+/);
        return parts.length >= 2 && parts[1].length > 0;
      },
      {
        message: "Please enter your full name (first and last name)",
      },
    ),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters.")
    .refine(
      (password) => /[A-Z]/.test(password),
      "Password must include at least one uppercase letter",
    )
    .refine(
      (password) => /[a-z]/.test(password),
      "Password must include at least one lowercase letter",
    )
    .refine(
      (password) => /[0-9]/.test(password),
      "Password must include at least one number",
    )
    .refine(
      (password) => /[^A-Za-z0-9]/.test(password),
      "Password must include at least one special character",
    ),
  birthDate: z
    .string()
    .min(1, "Birthdate is required")
    .refine((date) => {
      const age = calculateAge(date);
      return age >= 18;
    }, "You must be at least 18 years old to register."),
});

export default function RegisterFormComponent() {
  const [submitError, setSubmitError] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      birthdate: "",
    },
  });

  const onSubmit = async (data) => {
    setSubmitError("");

    const nameParts = data.fullName.trim().split(/\s+/);
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ");

    try {
      await registerAction({
        firstName,
        lastName,
        email: data.email,
        password: data.password,
        birthDate: data.birthDate,
      });
      router.push("/login");
      router.refresh();
    } catch (error) {
      if (
        error.message === "NEXT_REDIRECT" ||
        error.digest?.includes("NEXT_REDIRECT")
      ) {
        return;
      }
      setSubmitError("Registration failed. Please try again.");
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

      {/* Name */}
      <div>
        <label
          htmlFor="fullName"
          className="block text-sm font-medium text-gray-700"
        >
          Full name
        </label>
        <input
          id="fullName"
          type="text"
          placeholder="Chhinchheang Dara"
          {...register("fullName")}
          className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none ring-lime-400/20 focus:border-lime-400 focus:ring-2"
        />
        {errors.fullName && (
          <p className="mt-1 text-xs text-red-500">{errors.fullName.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          {...register("email")}
          className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none ring-lime-400/20 focus:border-lime-400 focus:ring-2"
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="••••••••"
          {...register("password")}
          className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none ring-lime-400/20 focus:border-lime-400 focus:ring-2"
        />
        {errors.password && (
          <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
        )}
        {/* password hint when no error yet */}
        {!errors.password && (
          <p className="mt-1 text-xs text-gray-400">
            Min 8 chars, uppercase, lowercase, number, special character
          </p>
        )}
      </div>

      {/* Birthdate */}
      <div>
        <label
          htmlFor="birthDate"
          className="block text-sm font-medium text-gray-700"
        >
          Birthdate
        </label>
        <input
          id="birthDate"
          type="date"
          {...register("birthDate")}
          className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none ring-lime-400/20 focus:border-lime-400 focus:ring-2"
        />
        {errors.birthDate && (
          <p className="mt-1 text-xs text-red-500">
            {errors.birthDate.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        isLoading={isSubmitting}
        disabled={isSubmitting}
        className="w-full rounded-full bg-lime-400 py-3.5 text-sm font-semibold text-gray-900 shadow-sm transition hover:bg-lime-300"
      >
        {isSubmitting ? "Creating account..." : "Create account"}
      </Button>
    </form>
  );
}
