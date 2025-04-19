import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import Credentials from "next-auth/providers/credentials";
import { createNotification, getUsersByEmail } from "./action";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Facebook({
      clientId: process.env.AUTH_FACEBOOK_ID,
      clientSecret: process.env.AUTH_FACEBOOK_SECRET,
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
        if (!existedUser.email) {
          await createUser({
            email: user.email,
            fullName: user.name,
            claimDate: "",
            password: "",
            welcomePay: false,
            accountNumber: generateAccountNumber(),
            totalBalance: 0,
            image: user.image,
            nationality: "",
            pin: null,
            displayName: "",
          });
        } else {
          await createNotification({
            title: "Welcome Back",
            message: `You've logged in to your Apex account. Keep banking with us.`,
            senderName: "Apex",
            image: "/_next/static/media/apex-logo.e142e805.png",
            status: false,
            senderId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
            recieverId: existedUser.$id,
            recieverName: existedUser.fullName,
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
        session.user.userId = users.$id;
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
