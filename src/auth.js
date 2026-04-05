import NextAuth from "next-auth";
import { loginService } from "./service/auth.service";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const loginResponse = await loginService(credentials);
          const token = await loginResponse.payload.token;
          if (!token) {
            return null;
          }
          const userData = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/users/me`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            },
          );
          const currentUser = await userData.json();
          if (userData.ok && currentUser.payload) {
            const user = currentUser.payload;
            return {
              id: user.userId,
              email: user.email,
              fullName: `${user.firstName} ${user.lastName}`,
              accessToken: token,
            };
          }
          return null;
        } catch (error) {
          console.error("Internal Auth Error: ", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  // callbacks: {
  //   jwt: async ({ token, user }) => {
  //     if (user) {
  //       token.user = user;
  //     }
  //     return token;
  //   },
  //   session: async ({ session, token }) => {
  //     if (token && token.user) {
  //       session.user = token.user;
  //     }
  //     return session;
  //   },
  // },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        return { ...token, ...user };
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id,
          fullName: token.fullName,
          accessToken: token.accessToken,
          email: token.email,
        };
      }
      return session;
    },
  },
});
