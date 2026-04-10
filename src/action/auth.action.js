"use server";

import { registerService } from "../service/auth.service";
import { signIn, signOut } from "../auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
// import { isRedirectError } from "next/navigation";

const isRedirect = (error) =>
  error.message === "NEXT_REDIRECT" || error.digest?.includes("NEXT_REDIRECT");

export async function loginAction(data) {
  const { email, password } = data;
  try {
    const result = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });
    if (result?.error) {
      return { error: "Invalid email or password" };
    }
  } catch (error) {
    if (isRedirect(error)) throw error;
    console.error("Login Action Caught Error:", error);
    const specificMessage = error.cause?.err?.message;
    if (specificMessage) {
      return { error: specificMessage };
    }
    if (error.type === "CallbackRouteError") {
      return { error: "Invalid email or password" };
    }
    return { error: error.message || "An unexpected error occurred" };
  }
  revalidatePath("/");
  redirect("/");
  // redirect("/?auth=success");
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
    console.error("Register Action Caught Error:", error);
    return { error: error.message || "Registration failed" };
  }
  revalidatePath("/login");
  redirect("/login");
}

export async function logOutAction() {
  await signOut({ redirectTo: "/" });
  revalidatePath("/");
}
