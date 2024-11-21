import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { getUsersByEmail } from "./action";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      credentials: {
        username: {
          label: "Email",
          type: "text",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      authorize: async (credentials) => {
        try {
          const existingUser = await getUsersByEmail(credentials.email);
          if (!existingUser) {
            throw new Error("User not found.");
          }
          return {
            id: existingUser["$id"],
            name: existingUser.fullName,
            email: existingUser.email,
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth, request }) => {
      return !!auth?.user;
    },
    async signIn({ user }) {
      try {
        const existedUser = await getUsersByEmail(user.email);
        if (!existedUser) {
          await createUser({
            email: user.email,
            fullName: user.name,
            countryFlag: "",
            password: "",
            welcomePay: false,
            accountNumber: generateAccountNumber(),
            totalBalance: 0,
            image: user.image,
            nationality: "",
          });
        }
        return true;
      } catch {
        return false;
      }
    },

    async session({ session }) {
      try {
        const users = await getUsersByEmail(session.user.email);
        session.user.userId = users["$id"];
      } catch (error) {
        console.error("Error fetching user data:", error);
      }

      return session;
    },
  },
  pages: {
    signIn: "/auth/sign-in",
  },
};

export const { auth, signIn, signOut, handlers } = NextAuth(authConfig);
