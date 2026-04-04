"use server";

import { registerService } from "../service/auth.service";
import { signIn, signOut } from "../auth";
import { redirect } from "next/navigation";
// import { isRedirectError } from "next/navigation";

const isRedirect = (error) =>
  error.message === "NEXT_REDIRECT" || error.digest?.includes("NEXT_REDIRECT");

export async function loginAction(data) {
  const { email, password } = data;
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
  } catch (error) {
    if (isRedirect(error)) throw error;
    console.error("Login Error Details:", error);
    throw new Error("Login failed. Please check your credentials.");
  }
}

export async function registerAction(data) {
  const { firstName, lastName, email, password, birthDate } = data;
  try {
    await registerService({
      firstName,
      lastName,
      email,
      password,
      birthDate,
    });
  } catch (error) {
    if (isRedirect(error)) throw error;
    console.error("Registration Error Details:", error);
    throw new Error("Registration failed. Please check your input.");
  }
  redirect("/login");
}

export async function logOutAction() {
  await signOut({ redirectTo: "/" });
}
