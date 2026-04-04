import { NextResponse } from "next/server";
import { auth } from "./auth";

export default auth(function proxy(req) {
  const session = req.auth;
  const { pathname } = req.nextUrl;

  const isLoggedIn = session && !session.user?.error;
  const publicPaths = ["/", "/login", "/register"];
  const isPublicPath = publicPaths.includes(pathname);

  if (!isLoggedIn && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isLoggedIn && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/auth).*)"],
};
